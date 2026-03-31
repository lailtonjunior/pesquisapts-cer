import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase environment variables not configured');
  }
  return createClient(url, key);
}

// Extract user ID from Supabase JWT in Authorization header
async function getUserId(req: VercelRequest): Promise<string | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser(token);
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const supabase = getSupabase();
    const userId = await getUserId(req);

    if (req.method === 'POST') {
      const { surveyData, ptsData } = req.body;

      if (!surveyData || !surveyData.surveyType) {
        return res.status(400).json({ error: 'surveyData with surveyType is required' });
      }

      const { data, error } = await supabase
        .from('surveys')
        .insert({
          survey_type: surveyData.surveyType,
          status: 'completed',
          created_by: userId,
          user_name: surveyData.userName || null,
          birth_date: surveyData.birthDate || null,
          age: surveyData.age || null,
          diagnosis: surveyData.diagnosis || null,
          modality: surveyData.modality || [],
          application_date: surveyData.applicationDate || null,
          professional: surveyData.professional || null,
          caregiver_contact: surveyData.caregiverContact || null,
          survey_data: surveyData,
          pts_data: ptsData || {},
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({ error: 'Failed to save survey' });
      }

      return res.status(201).json(data);
    }

    if (req.method === 'GET') {
      const { id, search, type, limit: queryLimit } = req.query;

      if (id) {
        const { data, error } = await supabase
          .from('surveys')
          .select('*')
          .eq('id', id as string)
          .single();

        if (error) {
          return res.status(404).json({ error: 'Survey not found' });
        }
        return res.status(200).json(data);
      }

      let query = supabase
        .from('surveys')
        .select('id, survey_type, status, user_name, diagnosis, professional, application_date, created_at')
        .order('created_at', { ascending: false })
        .limit(Number(queryLimit) || 50);

      if (type) {
        query = query.eq('survey_type', type as string);
      }

      if (search) {
        query = query.ilike('user_name', `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase query error:', error);
        return res.status(500).json({ error: 'Failed to fetch surveys' });
      }

      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Survey API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
