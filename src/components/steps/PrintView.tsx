import { SurveyData } from '../../types/survey';

interface PrintViewProps {
  data: SurveyData;
}

export function PrintView({ data }: PrintViewProps) {
  return (
    <div className="hidden print:block print:w-full print:bg-white print:text-black print:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center border-b-2 border-black pb-6">
          <h1 className="text-2xl font-bold uppercase">Formulário PTS</h1>
          <h2 className="text-lg font-semibold mt-2">Projeto Terapêutico Singular (PTS) no CER</h2>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">1. Identificação do Usuário</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Nome:</strong> {data.ptsName}</p>
            <p><strong>Data de Nascimento:</strong> {data.ptsBirthDate}</p>
            <p><strong>Idade:</strong> {data.ptsAge}</p>
            <p><strong>Sexo:</strong> {data.ptsSex}</p>
            <p><strong>Município:</strong> {data.ptsCity}</p>
            <p><strong>Telefone:</strong> {data.ptsPhone}</p>
            <p><strong>Responsável/Acompanhante:</strong> {data.ptsGuardian}</p>
            <p><strong>Vínculo:</strong> {data.ptsRelationship}</p>
            <p><strong>Diagnóstico/Hipótese:</strong> {data.ptsDiagnosis}</p>
            <p><strong>Modalidade de Reabilitação:</strong> {data.ptsRehabModality}</p>
            <p><strong>Data da Elaboração:</strong> {data.ptsCreationDate}</p>
            <p><strong>Profissional de Referência:</strong> {data.ptsReferenceProfessional}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">2. Síntese Diagnóstica e Mapeamento da Rotina</h3>
          <div className="space-y-4 text-sm">
            <p><strong>Condição clínica e funcional:</strong> {data.ptsClinicalCondition}</p>
            <p><strong>Limitações de atividade:</strong> {data.ptsActivityLimitations}</p>
            <p><strong>Restrições de participação:</strong> {data.ptsParticipationRestrictions}</p>
            <p><strong>Fatores ambientais, familiares e sociais:</strong> {data.ptsEnvironmentalFactors}</p>
            <p><strong>Facilitadores:</strong> {data.ptsFacilitators}</p>
            <p><strong>Barreiras:</strong> {data.ptsBarriers}</p>
            <p><strong>Rotina diária:</strong> {data.ptsRoutine}</p>
            <p><strong>Atividades regulares:</strong> {data.ptsRegularActivities}</p>
            <p><strong>Auxílio nas atividades diárias:</strong> {data.ptsDailyAssistants}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">3. Rede de Apoio e Dinâmica Familiar</h3>
          <div className="space-y-4 text-sm">
            <p><strong>Pessoas de apoio:</strong> {data.ptsSupportPeople}</p>
            <p><strong>Serviços de saúde envolvidos:</strong> {data.ptsHealthServices}</p>
            <p><strong>Rede social/comunitária:</strong> {data.ptsSocialNetwork}</p>
            <p><strong>Quem facilita o tratamento:</strong> {data.ptsTreatmentFacilitators}</p>
            <p><strong>Quem dificulta o tratamento:</strong> {data.ptsTreatmentBarriers}</p>
            <p><strong>Composição familiar/arranjo domiciliar:</strong> {data.ptsFamilyComposition}</p>
            <p><strong>Cuidador principal:</strong> {data.ptsPrimaryCaregiver}</p>
            <p><strong>Autonomia decisória:</strong> {data.ptsDecisionAutonomy}</p>
            <p><strong>Dinâmica familiar para o cuidado:</strong> {data.ptsFamilyDynamics}</p>
            <p><strong>Observações sobre conflitos/sobrecarga:</strong> {data.ptsFamilyObservations}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">4. Metas Terapêuticas e Plano de Intervenção</h3>
          <div className="space-y-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Meta 1</h4>
              <p><strong>Descrição:</strong> {data.ptsGoal1}</p>
              <p><strong>Prazo:</strong> {data.ptsGoal1Deadline}</p>
              <p><strong>Indicador de alcance:</strong> {data.ptsGoal1Indicator}</p>
              <p><strong>Prioridade:</strong> {data.ptsGoal1Priority}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Meta 2</h4>
              <p><strong>Descrição:</strong> {data.ptsGoal2}</p>
              <p><strong>Prazo:</strong> {data.ptsGoal2Deadline}</p>
              <p><strong>Indicador de alcance:</strong> {data.ptsGoal2Indicator}</p>
              <p><strong>Prioridade:</strong> {data.ptsGoal2Priority}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Meta 3</h4>
              <p><strong>Descrição:</strong> {data.ptsGoal3}</p>
              <p><strong>Prazo:</strong> {data.ptsGoal3Deadline}</p>
              <p><strong>Indicador de alcance:</strong> {data.ptsGoal3Indicator}</p>
              <p><strong>Prioridade:</strong> {data.ptsGoal3Priority}</p>
            </div>
            <div className="space-y-2 pt-4">
              <p><strong>Condutas e intervenções previstas:</strong> {data.ptsInterventions}</p>
              <p><strong>Setores/profissionais envolvidos:</strong> {data.ptsProfessionalsInvolved.join(", ")} {data.ptsProfessionalsInvolvedOther ? `(${data.ptsProfessionalsInvolvedOther})` : ""}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">5. Responsabilidades e Articulação Intersetorial</h3>
          <div className="space-y-4 text-sm">
            <p><strong>Equipe do CER:</strong> {data.ptsCerResponsibilities}</p>
            <p><strong>Usuário:</strong> {data.ptsUserResponsibilities}</p>
            <p><strong>Família/cuidador:</strong> {data.ptsFamilyResponsibilities}</p>
            <p><strong>Rede externa:</strong> {data.ptsExternalNetworkResponsibilities}</p>
            <p><strong>Serviços a serem acionados:</strong> {data.ptsServicesToActivate}</p>
            <p><strong>Necessidade de matriciamento/encaminhamento:</strong> {data.ptsReferralNeeds}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-2">6. Reavaliação e Finalização</h3>
          <div className="space-y-4 text-sm">
            <p><strong>Data prevista:</strong> {data.ptsReevaluationDate}</p>
            <p><strong>Evolução das metas:</strong> {data.ptsGoalsEvolution}</p>
            <p><strong>Critérios para reavaliar:</strong> {data.ptsReevaluationCriteria}</p>
            <p><strong>Se não alcançadas, motivos/barreiras:</strong> {data.ptsUnmetGoalsReasons}</p>
            <div className="pt-4">
              <p className="font-bold mb-2">Observações finais:</p>
              <p className="whitespace-pre-wrap">{data.ptsFinalObservations}</p>
            </div>
          </div>
        </section>

        <section className="pt-12 space-y-12">
          <div className="grid grid-cols-2 gap-8 text-center text-sm">
            <div className="space-y-2">
              <div className="border-t border-black pt-2 mx-8"></div>
              <p className="font-bold">Profissional de Referência</p>
              <p>{data.ptsSignatureProfessional}</p>
            </div>
            <div className="space-y-2">
              <div className="border-t border-black pt-2 mx-8"></div>
              <p className="font-bold">Equipe Envolvida</p>
              <p>{data.ptsSignatureTeam}</p>
            </div>
            <div className="space-y-2 col-span-2 mt-8">
              <div className="border-t border-black pt-2 mx-24"></div>
              <p className="font-bold">Usuário / Responsável</p>
              <p>{data.ptsSignatureUser}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
