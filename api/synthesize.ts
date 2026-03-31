import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { rateLimitSynthesize } from './_rateLimit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!rateLimitSynthesize(req, res)) return;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  try {
    const { sectionName, contextData } = req.body;

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Você é um TÉCNICO ESPECIALIZADO EM ANÁLISE DE DADOS E SAÚDE.
      Gere uma síntese técnica e objetiva para a seção "${sectionName}" com base nos seguintes dados coletados:

      ${JSON.stringify(contextData, null, 2)}

      A síntese deve ser um parágrafo claro, profissional e direto, resumindo os principais pontos clínicos e sociais relevantes. Não use formatação markdown, apenas texto puro.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });

    if (response.text) {
      return res.status(200).json({ text: response.text.trim() });
    }

    return res.status(500).json({ error: 'No response from AI' });
  } catch (error) {
    console.error('Error generating synthesis:', error);
    return res.status(500).json({ error: 'Failed to generate synthesis' });
  }
}
