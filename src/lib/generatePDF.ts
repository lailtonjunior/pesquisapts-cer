import type { SurveyData } from '../types/survey';

const MARGIN_LEFT = 20;
const MARGIN_TOP = 15;
const MARGIN_BOTTOM = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const USABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT * 2; // 170mm
const LINE_HEIGHT = 7;
const FONT_SECTION = 12;
const FONT_FIELD = 10;

function checkPageBreak(doc: any, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - MARGIN_BOTTOM) {
    doc.addPage();
    return MARGIN_TOP;
  }
  return y;
}

function addSectionTitle(doc: any, y: number, title: string): number {
  y = checkPageBreak(doc, y, LINE_HEIGHT * 2);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_SECTION);
  doc.text(title, MARGIN_LEFT, y);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y + 1.5, PAGE_WIDTH - MARGIN_LEFT, y + 1.5);
  return y + LINE_HEIGHT;
}

function addField(doc: any, y: number, label: string, value: string): number {
  if (!value || value.trim() === '') return y;

  y = checkPageBreak(doc, y, LINE_HEIGHT);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_FIELD);

  const labelText = `${label}: `;
  const labelWidth = doc.getTextWidth(labelText);

  doc.text(labelText, MARGIN_LEFT, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_FIELD);

  const valueX = MARGIN_LEFT + labelWidth;
  const valueMaxWidth = USABLE_WIDTH - labelWidth;

  const lines = doc.splitTextToSize(value, valueMaxWidth);

  if (lines.length === 1) {
    doc.text(lines[0], valueX, y);
    return y + LINE_HEIGHT;
  }

  // First line after label
  doc.text(lines[0], valueX, y);
  y += LINE_HEIGHT;

  // Remaining lines indented to align with value start
  for (let i = 1; i < lines.length; i++) {
    y = checkPageBreak(doc, y, LINE_HEIGHT);
    doc.text(lines[i], MARGIN_LEFT + 4, y);
    y += LINE_HEIGHT;
  }

  return y;
}

function addTwoColumnFields(
  doc: any,
  y: number,
  fields: Array<{ label: string; value: string }>
): number {
  const colWidth = USABLE_WIDTH / 2;
  const col2X = MARGIN_LEFT + colWidth;

  for (let i = 0; i < fields.length; i += 2) {
    y = checkPageBreak(doc, y, LINE_HEIGHT);

    const left = fields[i];
    const right = fields[i + 1];

    // Left column
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_FIELD);
    const leftLabel = `${left.label}: `;
    doc.text(leftLabel, MARGIN_LEFT, y);
    doc.setFont('helvetica', 'normal');
    const leftLabelW = doc.getTextWidth(leftLabel);
    const leftValueLines = doc.splitTextToSize(left.value || '', colWidth - leftLabelW - 2);
    doc.text(leftValueLines[0] || '', MARGIN_LEFT + leftLabelW, y);

    // Right column
    if (right) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(FONT_FIELD);
      const rightLabel = `${right.label}: `;
      doc.text(rightLabel, col2X, y);
      doc.setFont('helvetica', 'normal');
      const rightLabelW = doc.getTextWidth(rightLabel);
      const rightValueLines = doc.splitTextToSize(right.value || '', colWidth - rightLabelW - 2);
      doc.text(rightValueLines[0] || '', col2X + rightLabelW, y);
    }

    y += LINE_HEIGHT;

    // Handle overflow lines for left column
    for (let li = 1; li < leftValueLines.length; li++) {
      y = checkPageBreak(doc, y, LINE_HEIGHT);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(FONT_FIELD);
      doc.text(leftValueLines[li], MARGIN_LEFT + 4, y);
      y += LINE_HEIGHT;
    }
  }

  return y;
}

function addGoalBlock(
  doc: any,
  y: number,
  number: number,
  goal: string,
  deadline: string,
  indicator: string,
  priority: string
): number {
  if (!goal && !deadline && !indicator && !priority) return y;

  y = checkPageBreak(doc, y, LINE_HEIGHT * 2);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONT_FIELD);
  doc.text(`Meta ${number}:`, MARGIN_LEFT, y);
  y += LINE_HEIGHT * 0.5;

  y = addField(doc, y, '  Descricao', goal);
  y = addField(doc, y, '  Prazo', deadline);
  y = addField(doc, y, '  Indicador', indicator);
  y = addField(doc, y, '  Prioridade', priority);

  return y + 2;
}

export async function generatePDF(data: SurveyData): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  let y = MARGIN_TOP;

  // ── HEADER ──────────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('FORMULARIO PTS', PAGE_WIDTH / 2, y, { align: 'center' });
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Projeto Terapeutico Singular (PTS) no CER', PAGE_WIDTH / 2, y, { align: 'center' });
  y += 6;

  doc.setLineWidth(0.5);
  doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_LEFT, y);
  y += LINE_HEIGHT;

  // ── SECTION 1 - Identificacao do Usuario ────────────────────────────────────
  y = addSectionTitle(doc, y, '1. Identificacao do Usuario');

  const identFields = [
    { label: 'Nome', value: data.ptsName || '' },
    { label: 'Data de Nascimento', value: data.ptsBirthDate || '' },
    { label: 'Idade', value: data.ptsAge || '' },
    { label: 'Sexo', value: data.ptsSex || '' },
    { label: 'Municipio', value: data.ptsCity || '' },
    { label: 'Telefone', value: data.ptsPhone || '' },
    { label: 'Responsavel', value: data.ptsGuardian || '' },
    { label: 'Vinculo', value: data.ptsRelationship || '' },
    { label: 'Diagnostico', value: data.ptsDiagnosis || '' },
    { label: 'Modalidade', value: data.ptsRehabModality || '' },
    { label: 'Data de Elaboracao', value: data.ptsCreationDate || '' },
    { label: 'Profissional de Referencia', value: data.ptsReferenceProfessional || '' },
  ];

  y = addTwoColumnFields(doc, y, identFields);
  y += 3;

  // ── SECTION 2 - Sintese Diagnostica e Mapeamento da Rotina ──────────────────
  y = addSectionTitle(doc, y, '2. Sintese Diagnostica e Mapeamento da Rotina');

  y = addField(doc, y, 'Condicao Clinica', data.ptsClinicalCondition || '');
  y = addField(doc, y, 'Limitacoes de Atividade', data.ptsActivityLimitations || '');
  y = addField(doc, y, 'Restricoes de Participacao', data.ptsParticipationRestrictions || '');
  y = addField(doc, y, 'Fatores Ambientais', data.ptsEnvironmentalFactors || '');
  y = addField(doc, y, 'Facilitadores', data.ptsFacilitators || '');
  y = addField(doc, y, 'Barreiras', data.ptsBarriers || '');
  y = addField(doc, y, 'Rotina', data.ptsRoutine || '');
  y = addField(doc, y, 'Atividades Regulares', data.ptsRegularActivities || '');
  y = addField(doc, y, 'Assistentes Diarios', data.ptsDailyAssistants || '');
  y += 3;

  // ── SECTION 3 - Rede de Apoio e Dinamica Familiar ───────────────────────────
  y = addSectionTitle(doc, y, '3. Rede de Apoio e Dinamica Familiar');

  y = addField(doc, y, 'Pessoas de Apoio', data.ptsSupportPeople || '');
  y = addField(doc, y, 'Servicos de Saude', data.ptsHealthServices || '');
  y = addField(doc, y, 'Rede Social', data.ptsSocialNetwork || '');
  y = addField(doc, y, 'Facilitadores do Tratamento', data.ptsTreatmentFacilitators || '');
  y = addField(doc, y, 'Barreiras ao Tratamento', data.ptsTreatmentBarriers || '');
  y = addField(doc, y, 'Composicao Familiar', data.ptsFamilyComposition || '');
  y = addField(doc, y, 'Cuidador Principal', data.ptsPrimaryCaregiver || '');
  y = addField(doc, y, 'Autonomia para Decisoes', data.ptsDecisionAutonomy || '');
  y = addField(doc, y, 'Dinamica Familiar', data.ptsFamilyDynamics || '');
  y = addField(doc, y, 'Observacoes Familiares', data.ptsFamilyObservations || '');
  y += 3;

  // ── SECTION 4 - Metas Terapeuticas ──────────────────────────────────────────
  y = addSectionTitle(doc, y, '4. Metas Terapeuticas');

  y = addGoalBlock(
    doc, y, 1,
    data.ptsGoal1 || '', data.ptsGoal1Deadline || '',
    data.ptsGoal1Indicator || '', data.ptsGoal1Priority || ''
  );
  y = addGoalBlock(
    doc, y, 2,
    data.ptsGoal2 || '', data.ptsGoal2Deadline || '',
    data.ptsGoal2Indicator || '', data.ptsGoal2Priority || ''
  );
  y = addGoalBlock(
    doc, y, 3,
    data.ptsGoal3 || '', data.ptsGoal3Deadline || '',
    data.ptsGoal3Indicator || '', data.ptsGoal3Priority || ''
  );

  y = addField(doc, y, 'Intervencoes', data.ptsInterventions || '');

  const professionalsValue = [
    ...(data.ptsProfessionalsInvolved || []),
    ...(data.ptsProfessionalsInvolvedOther ? [data.ptsProfessionalsInvolvedOther] : []),
  ].join(', ');
  y = addField(doc, y, 'Profissionais Envolvidos', professionalsValue);
  y += 3;

  // ── SECTION 5 - Responsabilidades ───────────────────────────────────────────
  y = addSectionTitle(doc, y, '5. Responsabilidades');

  y = addField(doc, y, 'Responsabilidades do CER', data.ptsCerResponsibilities || '');
  y = addField(doc, y, 'Responsabilidades do Usuario', data.ptsUserResponsibilities || '');
  y = addField(doc, y, 'Responsabilidades da Familia', data.ptsFamilyResponsibilities || '');
  y = addField(doc, y, 'Responsabilidades da Rede Externa', data.ptsExternalNetworkResponsibilities || '');
  y = addField(doc, y, 'Servicos a Acionar', data.ptsServicesToActivate || '');
  y = addField(doc, y, 'Necessidades de Encaminhamento', data.ptsReferralNeeds || '');
  y += 3;

  // ── SECTION 6 - Reavaliacao ──────────────────────────────────────────────────
  y = addSectionTitle(doc, y, '6. Reavaliacao');

  y = addField(doc, y, 'Data de Reavaliacao', data.ptsReevaluationDate || '');
  y = addField(doc, y, 'Evolucao das Metas', data.ptsGoalsEvolution || '');
  y = addField(doc, y, 'Criterios de Reavaliacao', data.ptsReevaluationCriteria || '');
  y = addField(doc, y, 'Motivos de Metas Nao Cumpridas', data.ptsUnmetGoalsReasons || '');
  y = addField(doc, y, 'Observacoes Finais', data.ptsFinalObservations || '');
  y += 6;

  // ── SIGNATURE AREA ───────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 50);

  const sigLabels = [
    'Profissional de Referencia',
    'Equipe Envolvida',
    'Usuario / Responsavel',
  ];
  const sigColWidth = USABLE_WIDTH / 3;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONT_FIELD);

  sigLabels.forEach((label, idx) => {
    const x = MARGIN_LEFT + idx * sigColWidth + sigColWidth / 2;
    const lineStartX = MARGIN_LEFT + idx * sigColWidth + 4;
    const lineEndX = MARGIN_LEFT + (idx + 1) * sigColWidth - 4;

    doc.line(lineStartX, y, lineEndX, y);
    doc.text(label, x, y + 5, { align: 'center' });
  });

  // ── SAVE ─────────────────────────────────────────────────────────────────────
  const fileName = `PTS_${data.ptsName || 'documento'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
