import { Users } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import { MODALITY_OPTIONS, CHILD_OTHER_HEALTH_OPTIONS } from '../../../constants/survey';
import { SynthesisField } from '../../ui/SynthesisField';

const TRANSPORT_OPTIONS = ['Transporte Público', 'Carro Próprio', 'Aplicativo', 'A pé', 'Outro'];

export function EcomapStep({
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
        2. Ecomapa - Rede de Apoio e Participação
      </h2>

      <div className="space-y-8">

        {/* Rede de Cuidados */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">Rede de Cuidados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Cuidador principal</label>
              <input
                type="text"
                value={data.childPrimaryCaregiver}
                onChange={(e) => onChange('childPrimaryCaregiver', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Outros cuidadores</label>
              <input
                type="text"
                value={data.childOtherCaregivers}
                onChange={(e) => onChange('childOtherCaregivers', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Participação dos cuidadores</label>
              <textarea
                value={data.childCaregiverParticipation}
                onChange={(e) => onChange('childCaregiverParticipation', e.target.value)}
                className="w-full h-24 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Acompanhamentos de Saúde */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">Acompanhamentos de Saúde</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Acompanhamentos no CER</label>
              <div className="grid grid-cols-2 gap-3">
                {MODALITY_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.childCerAccompaniments.includes(option)}
                      onChange={() => onArrayChange('childCerAccompaniments', option)}
                      className="w-4 h-4 text-apae-blue border-zinc-300 rounded focus:ring-apae-blue"
                    />
                    <span className="text-sm text-zinc-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Outros acompanhamentos de saúde</label>
              <div className="grid grid-cols-2 gap-3">
                {CHILD_OTHER_HEALTH_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.childOtherHealthAccompaniments.includes(option)}
                      onChange={() => onArrayChange('childOtherHealthAccompaniments', option)}
                      className="w-4 h-4 text-apae-blue border-zinc-300 rounded focus:ring-apae-blue"
                    />
                    <span className="text-sm text-zinc-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Usa medicação?</label>
              <input
                type="text"
                value={data.childUsesMedication}
                onChange={(e) => onChange('childUsesMedication', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quais medicações?</label>
              <input
                type="text"
                value={data.childMedications}
                onChange={(e) => onChange('childMedications', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Rede Escolar e Comunitária */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">Rede Escolar e Comunitária</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Apoio escolar</label>
              <input
                type="text"
                value={data.childSchoolSupport}
                onChange={(e) => onChange('childSchoolSupport', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Observações escolares</label>
              <input
                type="text"
                value={data.childSchoolObservations}
                onChange={(e) => onChange('childSchoolObservations', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Atividades complementares</label>
              <input
                type="text"
                value={data.childComplementaryActivities}
                onChange={(e) => onChange('childComplementaryActivities', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Espaços comunitários/religiosos</label>
              <input
                type="text"
                value={data.childCommunityReligiousSpaces}
                onChange={(e) => onChange('childCommunityReligiousSpaces', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Acesso e Logística */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">Acesso e Logística</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Meio de transporte</label>
              <div className="grid grid-cols-2 gap-3">
                {TRANSPORT_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.childTransportOptions.includes(option)}
                      onChange={() => onArrayChange('childTransportOptions', option)}
                      className="w-4 h-4 text-apae-blue border-zinc-300 rounded focus:ring-apae-blue"
                    />
                    <span className="text-sm text-zinc-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Dificuldades de acesso</label>
              <input
                type="text"
                value={data.childAccessDifficulties}
                onChange={(e) => onChange('childAccessDifficulties', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Facilitadores do tratamento</label>
              <input
                type="text"
                value={data.childTreatmentFacilitators}
                onChange={(e) => onChange('childTreatmentFacilitators', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Barreiras do tratamento</label>
              <input
                type="text"
                value={data.childTreatmentBarriers}
                onChange={(e) => onChange('childTreatmentBarriers', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <SynthesisField
                label="Síntese técnica do ecomapa"
                value={data.childEcomapSynthesis}
                onChange={(value) => onChange('childEcomapSynthesis', value)}
                onGenerate={() =>
                  onGenerateSynthesis('childEcomapSynthesis', 'Ecomapa', [
                    'childPrimaryCaregiver', 'childOtherCaregivers', 'childCerAccompaniments',
                    'childOtherHealthAccompaniments', 'childSchoolSupport', 'childCommunityReligiousSpaces',
                    'childTreatmentFacilitators', 'childTreatmentBarriers',
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
