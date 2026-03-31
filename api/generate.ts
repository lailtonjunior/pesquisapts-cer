import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { rateLimitGenerate } from './_rateLimit';

const PTS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    ptsName: { type: Type.STRING },
    ptsBirthDate: { type: Type.STRING },
    ptsAge: { type: Type.STRING },
    ptsSex: { type: Type.STRING },
    ptsCity: { type: Type.STRING },
    ptsPhone: { type: Type.STRING },
    ptsGuardian: { type: Type.STRING },
    ptsRelationship: { type: Type.STRING },
    ptsDiagnosis: { type: Type.STRING },
    ptsRehabModality: { type: Type.STRING },
    ptsReferenceProfessional: { type: Type.STRING },
    ptsClinicalCondition: { type: Type.STRING },
    ptsActivityLimitations: { type: Type.STRING },
    ptsParticipationRestrictions: { type: Type.STRING },
    ptsEnvironmentalFactors: { type: Type.STRING },
    ptsFacilitators: { type: Type.STRING },
    ptsBarriers: { type: Type.STRING },
    ptsRoutine: { type: Type.STRING },
    ptsRegularActivities: { type: Type.STRING },
    ptsDailyAssistants: { type: Type.STRING },
    ptsSupportPeople: { type: Type.STRING },
    ptsHealthServices: { type: Type.STRING },
    ptsSocialNetwork: { type: Type.STRING },
    ptsTreatmentFacilitators: { type: Type.STRING },
    ptsTreatmentBarriers: { type: Type.STRING },
    ptsFamilyComposition: { type: Type.STRING },
    ptsPrimaryCaregiver: { type: Type.STRING },
    ptsDecisionAutonomy: { type: Type.STRING },
    ptsFamilyDynamics: { type: Type.STRING },
    ptsFamilyObservations: { type: Type.STRING },
    ptsGoal1: { type: Type.STRING },
    ptsGoal1Deadline: { type: Type.STRING },
    ptsGoal1Indicator: { type: Type.STRING },
    ptsGoal1Priority: { type: Type.STRING },
    ptsGoal2: { type: Type.STRING },
    ptsGoal2Deadline: { type: Type.STRING },
    ptsGoal2Indicator: { type: Type.STRING },
    ptsGoal2Priority: { type: Type.STRING },
    ptsGoal3: { type: Type.STRING },
    ptsGoal3Deadline: { type: Type.STRING },
    ptsGoal3Indicator: { type: Type.STRING },
    ptsGoal3Priority: { type: Type.STRING },
    ptsInterventions: { type: Type.STRING },
    ptsProfessionalsInvolved: { type: Type.ARRAY, items: { type: Type.STRING } },
    ptsProfessionalsInvolvedOther: { type: Type.STRING },
    ptsCerResponsibilities: { type: Type.STRING },
    ptsUserResponsibilities: { type: Type.STRING },
    ptsFamilyResponsibilities: { type: Type.STRING },
    ptsExternalNetworkResponsibilities: { type: Type.STRING },
    ptsServicesToActivate: { type: Type.STRING },
    ptsReferralNeeds: { type: Type.STRING },
    ptsReevaluationDate: { type: Type.STRING },
    ptsGoalsEvolution: { type: Type.STRING },
    ptsReevaluationCriteria: { type: Type.STRING },
    ptsUnmetGoalsReasons: { type: Type.STRING },
    ptsFinalObservations: { type: Type.STRING },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!rateLimitGenerate(req, res)) return;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  try {
    const { data, additionalInstructions } = req.body;

    const ai = new GoogleGenAI({ apiKey });
    let prompt = `Você é um TÉCNICO ESPECIALIZADO EM ANÁLISE DE DADOS PARA ELABORAÇÃO DE PROJETO TERAPÊUTICO SINGULAR (PTS).
      Analise os dados coletados na pesquisa abaixo e preencha TODOS os campos do Formulário PTS.
      Aja como o profissional responsável pelo caso. Seja objetivo, clínico e claro.

      Dados da pesquisa:
      ${JSON.stringify(data, null, 2)}`;

    if (additionalInstructions) {
      prompt += `\n\nInstruções adicionais do profissional para ajustar o PTS:\n${additionalInstructions}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
        responseSchema: PTS_SCHEMA,
      },
    });

    if (response.text) {
      let text = response.text;
      if (text.startsWith('```json')) {
        text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (text.startsWith('```')) {
        text = text.replace(/^```\n/, '').replace(/\n```$/, '');
      }
      const result = JSON.parse(text);
      return res.status(200).json(result);
    }

    return res.status(500).json({ error: 'No response from AI' });
  } catch (error) {
    console.error('Error generating PTS:', error);
    return res.status(500).json({ error: 'Failed to generate PTS analysis' });
  }
}
