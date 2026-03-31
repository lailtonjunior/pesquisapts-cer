interface SurveySummary {
  id: string;
  survey_type: string;
  status: string;
  user_name: string | null;
  diagnosis: string | null;
  professional: string | null;
  application_date: string | null;
  created_at: string;
}

export function exportToCSV(surveys: SurveySummary[], filename?: string): void {
  const surveyTypeMap: Record<string, string> = {
    adult: 'Adulto',
    child: 'Infantil',
  };

  const statusMap: Record<string, string> = {
    completed: 'Concluída',
    draft: 'Rascunho',
  };

  function escapeCSV(value: string | null | undefined): string {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  const headers = [
    'ID',
    'Tipo',
    'Status',
    'Nome do Paciente',
    'Diagnostico',
    'Profissional',
    'Data da Aplicacao',
    'Criado em',
  ];

  const rows = surveys.map((survey) => {
    const createdAt = new Date(survey.created_at).toLocaleDateString('pt-BR');

    return [
      escapeCSV(survey.id),
      escapeCSV(surveyTypeMap[survey.survey_type] ?? survey.survey_type),
      escapeCSV(statusMap[survey.status] ?? survey.status),
      escapeCSV(survey.user_name),
      escapeCSV(survey.diagnosis),
      escapeCSV(survey.professional),
      escapeCSV(survey.application_date),
      escapeCSV(createdAt),
    ].join(',');
  });

  const csvContent =
    '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

  const today = new Date().toISOString().slice(0, 10);
  const defaultFilename = `pesquisas_pts_cer_${today}.csv`;
  const resolvedFilename = filename ?? defaultFilename;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = resolvedFilename;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
