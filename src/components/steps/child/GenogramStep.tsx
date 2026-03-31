import { Users } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import { CHILD_PARENTS_MARITAL_STATUS, CHILD_CAREGIVER_DIVERGENCE_ASPECTS } from '../../../constants/survey';
import { SynthesisField } from '../../ui/SynthesisField';

export function GenogramStep({
  data,
  onChange,
  onArrayChange,
  onGenerateSynthesis,
  isGenerating,
}: StepProps) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-900 mb-6 flex items-center gap-3">
        <Users className="w-6 h-6 text-zinc-400" />
        3. Genograma - Estrutura e Dinâmica Familiar
      </h2>
      <p className="text-sm text-zinc-500 mb-8">
        Registrar composição familiar, relações significativas, estilos de cuidado e possíveis divergências que interfiram no processo terapêutico.
      </p>

      <div className="space-y-8">

        {/* 3.1 Composição familiar */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">3.1 Composição familiar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Pai</label>
              <input
                type="text"
                value={data.childFather}
                onChange={(e) => onChange('childFather', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Mãe</label>
              <input
                type="text"
                value={data.childMother}
                onChange={(e) => onChange('childMother', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Responsável legal</label>
              <input
                type="text"
                value={data.childLegalGuardian}
                onChange={(e) => onChange('childLegalGuardian', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Irmãos</label>
              <input
                type="text"
                value={data.childSiblings}
                onChange={(e) => onChange('childSiblings', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Avós / outros moradores da casa</label>
              <input
                type="text"
                value={data.childGrandparentsOther}
                onChange={(e) => onChange('childGrandparentsOther', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Situação conjugal dos pais/responsáveis</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CHILD_PARENTS_MARITAL_STATUS.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-300 flex items-center justify-center group-hover:border-zinc-500 transition-colors">
                      {data.childParentsMaritalStatus === option && <div className="w-2.5 h-2.5 bg-apae-blue rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={data.childParentsMaritalStatus === option}
                      onChange={() => onChange('childParentsMaritalStatus', option)}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                  </label>
                ))}
              </div>
              {data.childParentsMaritalStatus === 'Outro' && (
                <input
                  type="text"
                  placeholder="Qual outro?"
                  value={data.childParentsMaritalStatusOther}
                  onChange={(e) => onChange('childParentsMaritalStatusOther', e.target.value)}
                  className="w-full p-4 mt-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
                />
              )}
            </div>
          </div>
        </div>

        {/* 3.2 Dinâmica relacional */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">3.2 Dinâmica relacional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem toma as decisões principais sobre a criança?</label>
              <input
                type="text"
                value={data.childDecisionMaker}
                onChange={(e) => onChange('childDecisionMaker', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem adere melhor às orientações terapêuticas?</label>
              <input
                type="text"
                value={data.childTherapeuticAdherence}
                onChange={(e) => onChange('childTherapeuticAdherence', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Há divergência entre cuidadores?</label>
              <div className="flex gap-6 mb-3">
                {['Não', 'Sim'].map((option) => (
                  <label key={`div-${option}`} className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-300 flex items-center justify-center group-hover:border-zinc-500 transition-colors">
                      {data.childCaregiverDivergence === option && <div className="w-2.5 h-2.5 bg-apae-blue rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={data.childCaregiverDivergence === option}
                      onChange={() => onChange('childCaregiverDivergence', option)}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                  </label>
                ))}
              </div>

              {data.childCaregiverDivergence === 'Sim' && (
                <div className="space-y-3 mt-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                  <label className="text-sm font-medium text-zinc-700">Em quais aspectos?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CHILD_CAREGIVER_DIVERGENCE_ASPECTS.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${data.childCaregiverDivergenceAspects.includes(option) ? 'bg-apae-blue border-apae-blue' : 'border-zinc-300 group-hover:border-zinc-500'}`}>
                          {data.childCaregiverDivergenceAspects.includes(option) && (
                            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={data.childCaregiverDivergenceAspects.includes(option)}
                          onChange={() => onArrayChange('childCaregiverDivergenceAspects', option)}
                        />
                        <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                      </label>
                    ))}
                  </div>
                  {data.childCaregiverDivergenceAspects.includes('Outros') && (
                    <input
                      type="text"
                      placeholder="Quais outros?"
                      value={data.childCaregiverDivergenceOther}
                      onChange={(e) => onChange('childCaregiverDivergenceOther', e.target.value)}
                      className="w-full p-4 mt-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Existe algum cuidador que facilite muito o processo terapêutico?</label>
              <textarea
                value={data.childFacilitatingCaregiver}
                onChange={(e) => onChange('childFacilitatingCaregiver', e.target.value)}
                className="w-full h-24 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Existe alguma dinâmica familiar que prejudique a continuidade das orientações?</label>
              <textarea
                value={data.childDisruptiveDynamics}
                onChange={(e) => onChange('childDisruptiveDynamics', e.target.value)}
                className="w-full h-24 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* 3.3 Aspectos relevantes da convivência */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">3.3 Aspectos relevantes da convivência</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Com quem a criança convive na maior parte do tempo?</label>
              <input
                type="text"
                value={data.childConvivesMostWith}
                onChange={(e) => onChange('childConvivesMostWith', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem costuma ceder mais facilmente às demandas da criança?</label>
              <input
                type="text"
                value={data.childYieldsToDemands}
                onChange={(e) => onChange('childYieldsToDemands', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem sustenta melhor combinados, limites e rotina?</label>
              <input
                type="text"
                value={data.childSustainsLimits}
                onChange={(e) => onChange('childSustainsLimits', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Existem conflitos familiares que impactam o cuidado?</label>
              <textarea
                value={data.childFamilyConflicts}
                onChange={(e) => onChange('childFamilyConflicts', e.target.value)}
                className="w-full h-24 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <SynthesisField
                label="Síntese técnica do genograma"
                value={data.childGenogramSynthesis}
                onChange={(value) => onChange('childGenogramSynthesis', value)}
                onGenerate={() =>
                  onGenerateSynthesis('childGenogramSynthesis', 'Genograma', [
                    'childFather', 'childMother', 'childLegalGuardian', 'childSiblings',
                    'childGrandparentsOther', 'childParentsMaritalStatus', 'childConvivesMostWith',
                    'childYieldsToDemands', 'childSustainsLimits', 'childFamilyConflicts',
                    'childDisruptiveDynamics',
                  ])
                }
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
