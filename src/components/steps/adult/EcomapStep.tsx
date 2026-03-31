import { Users } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import {
  HEALTH_NETWORK_OPTIONS,
  OCCUPATIONAL_NETWORK_OPTIONS,
  LOGISTICAL_SUPPORT_OPTIONS,
} from '../../../constants/survey';
import { TextInput } from '../../ui/TextInput';
import { TextArea } from '../../ui/TextArea';
import { CheckboxGroup } from '../../ui/CheckboxGroup';
import { SynthesisField } from '../../ui/SynthesisField';

export function EcomapStep({
  data,
  onChange,
  onArrayChange,
  onGenerateSynthesis,
  isGenerating,
}: StepProps) {
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 text-zinc-400 mb-4">
          <Users className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">4. Ecomapa</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">Rede de Apoio e Participação</h2>
      </div>

      {/* 4.1 Rede familiar e social */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">4.1 Rede familiar e social</h3>
        <div className="grid grid-cols-1 gap-6">
          <TextInput
            label="Cuidador principal (se houver) e grau de participação:"
            value={data.primaryCaregiver}
            onChange={(value) => onChange('primaryCaregiver', value)}
          />
          <TextInput
            label="Outros familiares / pessoas de apoio frequente:"
            value={data.otherFamilySupport}
            onChange={(value) => onChange('otherFamilySupport', value)}
          />
          <TextInput
            label="Quem facilita a adesão ao tratamento?"
            value={data.treatmentFacilitators}
            onChange={(value) => onChange('treatmentFacilitators', value)}
          />
          <TextInput
            label="Quem ou o que dificulta a adesão ao tratamento?"
            value={data.treatmentBarriers}
            onChange={(value) => onChange('treatmentBarriers', value)}
          />
        </div>
      </div>

      {/* 4.2 Rede de saúde */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">4.2 Rede de saúde</h3>
        <CheckboxGroup
          options={HEALTH_NETWORK_OPTIONS}
          selected={data.healthNetworkOptions}
          onChange={(value) => onArrayChange('healthNetworkOptions', value)}
          columns={4}
        />
        <div className="pt-4 border-t border-zinc-100">
          <TextArea
            label="Outros acompanhamentos e observações relevantes:"
            value={data.healthNetworkObservations}
            onChange={(value) => onChange('healthNetworkObservations', value)}
            rows={6}
          />
        </div>
      </div>

      {/* 4.3 Rede ocupacional, comunitária e espiritual */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">4.3 Rede ocupacional, comunitária e espiritual</h3>
        <CheckboxGroup
          options={OCCUPATIONAL_NETWORK_OPTIONS}
          selected={data.occupationalNetworkOptions}
          onChange={(value) => onArrayChange('occupationalNetworkOptions', value)}
          columns={2}
        />
        <div className="pt-4 border-t border-zinc-100">
          <TextArea
            label="Outros ambientes/atividades em que o usuário participa com mais frequência:"
            value={data.occupationalNetworkObservations}
            onChange={(value) => onChange('occupationalNetworkObservations', value)}
            rows={6}
          />
        </div>
      </div>

      {/* 4.4 Apoios logísticos e barreiras */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">4.4 Apoios logísticos e barreiras</h3>
        <CheckboxGroup
          options={LOGISTICAL_SUPPORT_OPTIONS}
          selected={data.logisticalSupportOptions}
          onChange={(value) => onArrayChange('logisticalSupportOptions', value)}
          columns={4}
        />
        <div className="pt-4 border-t border-zinc-100">
          <SynthesisField
            label="Síntese técnica do ecomapa:"
            value={data.ecomapSynthesis}
            onChange={(value) => onChange('ecomapSynthesis', value)}
            onGenerate={() =>
              onGenerateSynthesis('ecomapSynthesis', 'Ecomapa', [
                'healthNetworkOptions',
                'occupationalNetworkOptions',
                'logisticalSupportOptions',
                'familyArrangementOptions',
                'priorityContexts',
                'pactuationPeople',
              ])
            }
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}
