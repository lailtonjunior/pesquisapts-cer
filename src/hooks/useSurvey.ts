import { useState, useEffect, useCallback } from 'react';
import type { SurveyData, ArrayField } from '../types/survey';
import { INITIAL_DATA, STORAGE_KEY, REQUIRED_FIELDS } from '../constants/survey';
import { toast } from '../lib/toast';
import { supabase } from '../lib/supabase';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  }
  return headers;
}

export function useSurvey() {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved).step || 0;
      } catch { return 0; }
    }
    return 0;
  });

  const [data, setData] = useState<SurveyData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_DATA, ...parsed.data };
      } catch { return INITIAL_DATA; }
    }
    return INITIAL_DATA;
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

  const totalSteps = data.surveyType === 'adult' ? 8 : 7;

  // Auto-save draft to localStorage
  useEffect(() => {
    if (step > 0 && data.surveyType) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    }
  }, [step, data]);

  const handleChange = useCallback((field: keyof SurveyData, value: string) => {
    setValidationErrors((prev) => {
      if (prev.has(field)) {
        const next = new Set(prev);
        next.delete(field);
        return next;
      }
      return prev;
    });
    setData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === 'birthDate') {
        const birthDate = new Date(value);
        if (!isNaN(birthDate.getTime())) {
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          newData.age = age.toString();
        } else {
          newData.age = '';
        }
      }
      return newData;
    });
  }, []);

  const handleArrayChange = useCallback((field: ArrayField, value: string) => {
    setData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  }, []);

  const validateStep = useCallback((): boolean => {
    let requiredKey: string | undefined;

    if (step === 1) {
      requiredKey = 'step1';
    } else if (step === 2 && data.surveyType === 'adult') {
      requiredKey = 'step2_adult';
    } else if (step === 2 && data.surveyType === 'child') {
      requiredKey = 'step2_child';
    } else if (step === 3 && data.surveyType === 'adult') {
      requiredKey = 'step3_adult';
    } else if (step === 3 && data.surveyType === 'child') {
      requiredKey = 'step3_child';
    } else if (step === 4 && data.surveyType === 'adult') {
      requiredKey = 'step4_adult';
    } else if (step === 4 && data.surveyType === 'child') {
      requiredKey = 'step4_child';
    } else if (step === 5 && data.surveyType === 'adult') {
      requiredKey = 'step5_adult';
    }

    if (!requiredKey) return true;

    const fields = REQUIRED_FIELDS[requiredKey];
    if (!fields) return true;

    const errors = new Set<string>();
    for (const field of fields) {
      const value = data[field];
      if (Array.isArray(value)) {
        if (value.length === 0) errors.add(field);
      } else if (!value || !value.trim()) {
        errors.add(field);
      }
    }

    if (errors.size > 0) {
      setValidationErrors(errors);
      toast('Preencha os campos obrigatórios antes de avançar.', 'warning');
      return false;
    }

    setValidationErrors(new Set());
    return true;
  }, [step, data]);

  const handleGenerateAI = useCallback(async (additionalInstructions?: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ data, additionalInstructions }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setData((prev) => ({ ...prev, ...result }));
      setStep(totalSteps - 2);
    } catch (error) {
      console.error('Erro ao gerar análise:', error);
      toast('Erro ao gerar análise com IA. Preencha manualmente ou tente novamente.', 'error');
      setStep(totalSteps - 2);
    } finally {
      setIsGenerating(false);
    }
  }, [data, totalSteps]);

  const handleGenerateSynthesis = useCallback(async (field: keyof SurveyData, sectionName: string, contextFields: (keyof SurveyData)[]) => {
    setIsGenerating(true);
    try {
      const contextData = contextFields.reduce((acc, f) => {
        acc[f] = data[f];
        return acc;
      }, {} as Record<string, unknown>);

      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ sectionName, contextData }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      if (result.text) {
        handleChange(field, result.text);
      }
    } catch (error) {
      console.error('Erro ao gerar síntese:', error);
      toast('Erro ao gerar síntese com IA. Tente novamente.', 'error');
    } finally {
      setIsGenerating(false);
    }
  }, [data, handleChange]);

  const handleNext = useCallback(() => {
    if (!validateStep()) return;

    if ((step === 5 && data.surveyType === 'adult') || (step === 4 && data.surveyType === 'child')) {
      handleGenerateAI();
    } else if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    }
  }, [step, data.surveyType, totalSteps, validateStep, handleGenerateAI]);

  const handleBack = useCallback(() => {
    setValidationErrors(new Set());
    if (step === totalSteps - 2 && data.surveyType === 'child') {
      setStep(4);
    } else if (step === totalSteps - 2 && data.surveyType === 'adult') {
      setStep(5);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  }, [step, totalSteps, data.surveyType]);

  const handleSubmit = useCallback(async () => {
    setIsSaving(true);
    try {
      const ptsFields = Object.fromEntries(
        Object.entries(data).filter(([key]) => key.startsWith('pts'))
      );

      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify({ surveyData: data, ptsData: ptsFields }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      localStorage.removeItem(STORAGE_KEY);
      toast('Pesquisa salva com sucesso!', 'success');
    } catch (error) {
      console.error('Error saving survey:', error);
      toast('Erro ao salvar no banco de dados, mas seus dados estão salvos localmente.', 'warning');
    } finally {
      setIsSaving(false);
      setStep(totalSteps);
    }
  }, [data, totalSteps]);

  const handleNewSurvey = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(INITIAL_DATA);
    setStep(0);
    setValidationErrors(new Set());
  }, []);

  const handleSelectType = useCallback((type: 'adult' | 'child') => {
    handleChange('surveyType', type);
    setStep(1);
  }, [handleChange]);

  const loadSurvey = useCallback((surveyData: SurveyData) => {
    setData({ ...INITIAL_DATA, ...surveyData });
    setStep(surveyData.surveyType ? (surveyData.surveyType === 'adult' ? 8 : 7) : 0);
    setValidationErrors(new Set());
  }, []);

  return {
    step,
    data,
    isGenerating,
    isSaving,
    totalSteps,
    validationErrors,
    handleChange,
    handleArrayChange,
    handleNext,
    handleBack,
    handleSubmit,
    handleNewSurvey,
    handleSelectType,
    handleGenerateAI,
    handleGenerateSynthesis,
    loadSurvey,
  };
}
