import type { SurveyData } from '../types/survey';

export const STORAGE_KEY = 'pesquisa-pts-cer-draft';

export const INITIAL_DATA: SurveyData = {
  surveyType: '',
  userName: '',
  birthDate: '',
  age: '',
  diagnosis: '',
  modality: [],
  applicationDate: new Date().toISOString().split('T')[0],
  professional: '',
  caregiverContact: '',
  updateReasons: [],
  updateReasonDescription: '',
  livesWith: '',
  spendsMostTimeWith: '',
  organizesRoutine: '',
  accompaniesDisplacements: '',
  routineMorning: '',
  routineMainPeriod: '',
  routineAfternoonNight: '',
  functionalityOptions: [],
  mainDifficulties: '',
  primaryCaregiver: '',
  otherFamilySupport: '',
  treatmentFacilitators: '',
  treatmentBarriers: '',
  healthNetworkOptions: [],
  healthNetworkObservations: '',
  occupationalNetworkOptions: [],
  occupationalNetworkObservations: '',
  logisticalSupportOptions: [],
  routineSynthesis: '',
  ecomapSynthesis: '',
  familyComposition: '',
  familyArrangementOptions: [],
  maritalStatusRelevance: '',
  healthDecisionMaker: '',
  familyDivergence: '',
  aiFacilitators: '',
  aiBarriers: '',
  priorityContexts: [],
  priorityContextsObservations: '',
  pactuationPeople: [],
  pactuationObservations: '',
  goalsObservations: '',
  professionalSynthesis: '',
  professionalSignature: '',
  date: new Date().toISOString().split('T')[0],
  childLivesWith: '',
  childSpendsMostTimeWith: '',
  childOrganizesRoutine: '',
  childAccompaniesDisplacements: '',
  childRoutineMorning: '',
  childSchoolName: '',
  childSchoolShift: '',
  childSchoolParticipation: '',
  childAfterSchoolTherapies: '',
  childAfterSchoolAccompaniment: '',
  childAfterSchoolResponse: '',
  childAfternoonStaysWith: '',
  childAfternoonActivities: '',
  childNightCaregiver: '',
  childNightRoutine: '',
  childWeekendRoutine: '',
  childCommunitySpaces: '',
  childBehaviorChanges: '',
  childFeedingIndependence: '',
  childFeedingObservations: '',
  childHygieneIndependence: '',
  childHygieneObservations: '',
  childDressingIndependence: '',
  childDressingObservations: '',
  childSleepOptions: [],
  childSleepObservations: '',
  childInterests: '',
  childRoutineSynthesis: '',
  childPrimaryCaregiver: '',
  childOtherCaregivers: '',
  childCaregiverParticipation: '',
  childCerAccompaniments: [],
  childCerAccompanimentsOther: '',
  childOtherHealthAccompaniments: [],
  childOtherHealthAccompanimentsOther: '',
  childUsesMedication: '',
  childMedications: '',
  childSchoolSupport: '',
  childSchoolObservations: '',
  childComplementaryActivities: '',
  childCommunityReligiousSpaces: '',
  childTransportOptions: [],
  childTransportOther: '',
  childAccessDifficulties: '',
  childTreatmentFacilitators: '',
  childTreatmentBarriers: '',
  childEcomapSynthesis: '',
  childFather: '',
  childMother: '',
  childLegalGuardian: '',
  childSiblings: '',
  childGrandparentsOther: '',
  childParentsMaritalStatus: '',
  childParentsMaritalStatusOther: '',
  childDecisionMaker: '',
  childTherapeuticAdherence: '',
  childCaregiverDivergence: '',
  childCaregiverDivergenceAspects: [],
  childCaregiverDivergenceOther: '',
  childFacilitatingCaregiver: '',
  childDisruptiveDynamics: '',
  childConvivesMostWith: '',
  childYieldsToDemands: '',
  childSustainsLimits: '',
  childFamilyConflicts: '',
  childGenogramSynthesis: '',
  ptsName: '',
  ptsBirthDate: '',
  ptsAge: '',
  ptsSex: '',
  ptsCity: '',
  ptsPhone: '',
  ptsGuardian: '',
  ptsRelationship: '',
  ptsDiagnosis: '',
  ptsRehabModality: '',
  ptsCreationDate: new Date().toISOString().split('T')[0],
  ptsReferenceProfessional: '',
  ptsClinicalCondition: '',
  ptsActivityLimitations: '',
  ptsParticipationRestrictions: '',
  ptsEnvironmentalFactors: '',
  ptsFacilitators: '',
  ptsBarriers: '',
  ptsRoutine: '',
  ptsRegularActivities: '',
  ptsDailyAssistants: '',
  ptsSupportPeople: '',
  ptsHealthServices: '',
  ptsSocialNetwork: '',
  ptsTreatmentFacilitators: '',
  ptsTreatmentBarriers: '',
  ptsFamilyComposition: '',
  ptsPrimaryCaregiver: '',
  ptsDecisionAutonomy: '',
  ptsFamilyDynamics: '',
  ptsFamilyObservations: '',
  ptsGoal1: '',
  ptsGoal1Deadline: '',
  ptsGoal1Indicator: '',
  ptsGoal1Priority: '',
  ptsGoal2: '',
  ptsGoal2Deadline: '',
  ptsGoal2Indicator: '',
  ptsGoal2Priority: '',
  ptsGoal3: '',
  ptsGoal3Deadline: '',
  ptsGoal3Indicator: '',
  ptsGoal3Priority: '',
  ptsInterventions: '',
  ptsProfessionalsInvolved: [],
  ptsProfessionalsInvolvedOther: '',
  ptsCerResponsibilities: '',
  ptsUserResponsibilities: '',
  ptsFamilyResponsibilities: '',
  ptsExternalNetworkResponsibilities: '',
  ptsServicesToActivate: '',
  ptsReferralNeeds: '',
  ptsReevaluationDate: '',
  ptsGoalsEvolution: '',
  ptsReevaluationCriteria: '',
  ptsUnmetGoalsReasons: '',
  ptsFinalObservations: '',
  ptsSignatureProfessional: '',
  ptsSignatureTeam: '',
  ptsSignatureUser: '',
};

export const MODALITY_OPTIONS = [
  'Fisioterapia', 'Fonoaudiologia', 'Terapia Ocupacional', 'Psicologia',
  'Serviço Social', 'Enfermagem', 'Ortopedia', 'Otorrinolaringologia',
  'Psiquiatria', 'Nutrição', 'Pedagogia', 'Educação Física',
  'Musicoterapia', 'Ostomias',
];

export const UPDATE_REASONS = [
  'Intervalo entre avaliação e início da intervenção',
  'Mudança clínica/comportamental',
  'Mudança funcional',
  'Mudança familiar',
  'Mudança de rotina',
  'Revisão do PTS',
  'Outros',
];

export const FUNCTIONALITY_OPTIONS = [
  'Autocuidado independente', 'Necessita supervisão parcial', 'Necessita ajuda frequente', 'Dependência importante',
  'Trabalha', 'Afastado do trabalho', 'Aposentado/BPC', 'Desempregado',
  'Atividade doméstica predominante', 'Estuda', 'Sai sozinho de casa', 'Necessita acompanhante',
  'Usa transporte próprio', 'Usa transporte público', 'Necessita transporte sanitário', 'Outro',
];

export const HEALTH_NETWORK_OPTIONS = [
  'CER', 'APS/UBS', 'Médico especialista', 'Psiquiatria',
  'Neurologia', 'Ortopedia', 'Fisioterapia', 'Fonoaudiologia',
  'TO', 'Psicologia', 'Serviço social', 'Nutrição',
  'Usa medicação contínua', 'Necessita ajuda para organizar medicações', 'Compreende as orientações terapêuticas', 'Necessita apoio para adesão',
];

export const OCCUPATIONAL_NETWORK_OPTIONS = [
  'Trabalho formal', 'Trabalho informal', 'Curso / capacitação', 'Atividade religiosa',
  'Grupo comunitário', 'Atividade física', 'Lazer regular', 'Sem participação comunitária regular',
];

export const LOGISTICAL_SUPPORT_OPTIONS = [
  'Transporte próprio', 'Transporte público', 'Transporte sanitário', 'Barreira financeira',
  'Barreira arquitetônica', 'Barreira de comunicação', 'Barreira familiar', 'Barreira geográfica',
];

export const FAMILY_ARRANGEMENT_OPTIONS = [
  'Vive sozinho', 'Casado/união estável', 'Separado',
  'Viúvo', 'Com filhos no domicílio', 'Com outros familiares no domicílio',
];

export const PRIORITY_CONTEXTS_OPTIONS = [
  'Domicílio', 'Trabalho', 'Comunidade', 'CER', 'APS', 'Ambiente institucional', 'Outros',
];

export const PACTUATION_PEOPLE_OPTIONS = [
  'Usuário', 'Familiar/cuidador', 'Equipe CER', 'APS/UBS', 'Médico assistente', 'Serviço social', 'Empregador/escola', 'Outro',
];

export const CHILD_SLEEP_OPTIONS = [
  'Sem queixas', 'Dificuldade para iniciar', 'Despertares noturnos', 'Sono inquieto',
];

export const INDEPENDENCE_OPTIONS = [
  'Independente', 'Parcialmente dependente', 'Dependente',
];

export const CHILD_TRANSPORT_OPTIONS = ['Transporte próprio', 'Transporte público', 'Transporte sanitário', 'Outro'];
export const CHILD_PARENTS_MARITAL_STATUS = ['Juntos', 'Separados', 'Guarda compartilhada', 'Outro'];
export const CHILD_CAREGIVER_DIVERGENCE_ASPECTS = ['Limites', 'Uso de telas', 'Alimentação', 'Comunicação', 'Rotina', 'Frequência nas terapias', 'Outros'];
export const CHILD_PRIORITY_CONTEXTS = ['Casa', 'Escola', 'CER', 'Atividades comunitárias', 'Outros'];
export const CHILD_PACTUATION_PEOPLE = ['Mãe', 'Pai', 'Avós', 'Escola', 'Médico assistente', 'Outros'];
export const CHILD_OTHER_HEALTH_OPTIONS = ['UBS', 'CAPS', 'Hospital', 'Clínica Particular', 'Outro'];

export const PTS_PROFESSIONALS_INVOLVED = ['Fisioterapia', 'Fonoaudiologia', 'Terapia Ocupacional', 'Psicologia', 'Psicopedagogia', 'Serviço Social', 'Nutrição', 'Médico', 'Outros'];
export const PTS_DECISION_AUTONOMY = ['Preservada', 'Parcial', 'Reduzida'];
export const PTS_GOALS_EVOLUTION = ['Alcançadas', 'Parcialmente alcançadas', 'Não alcançadas'];

// Required fields per step for validation
export const REQUIRED_FIELDS: Record<string, (keyof SurveyData)[]> = {
  'step1': ['userName', 'birthDate', 'diagnosis', 'professional'],
  'step2_adult': ['updateReasons'],
  'step2_child': ['childLivesWith'],
  'step3_adult': ['livesWith', 'routineMorning'],
  'step3_child': ['childPrimaryCaregiver'],
  'step4_adult': ['primaryCaregiver'],
  'step4_child': ['childFather'],
  'step5_adult': ['familyComposition'],
};
