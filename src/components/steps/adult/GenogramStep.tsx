import { Home } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import { FAMILY_ARRANGEMENT_OPTIONS } from '../../../constants/survey';
import { TextInput } from '../../ui/TextInput';
import { TextArea } from '../../ui/TextArea';
import { CheckboxGroup } from '../../ui/CheckboxGroup';
import { SynthesisField } from '../../ui/SynthesisField';

export function GenogramStep({
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
          <Home className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">5. Genograma</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">Estrutura e Dinâmica Familiar</h2>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <div className="space-y-3">
          <TextArea
            label="Composição familiar / arranjo domiciliar atual:"
            value={data.familyComposition}
            onChange={(value) => onChange('familyComposition', value)}
            rows={6}
          />
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <CheckboxGroup
            options={FAMILY_ARRANGEMENT_OPTIONS}
            selected={data.familyArrangementOptions}
            onChange={(value) => onArrayChange('familyArrangementOptions', value)}
            columns={3}
          />
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <TextInput
            label="Situação conjugal / afetiva relevante para o cuidado:"
            value={data.maritalStatusRelevance}
            onChange={(value) => onChange('maritalStatusRelevance', value)}
          />
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <TextInput
            label="Quem toma as decisões principais sobre saúde e tratamento?"
            value={data.healthDecisionMaker}
            onChange={(value) => onChange('healthDecisionMaker', value)}
          />
        </div>

        <div className="space-y-3 pt-4 border-t border-zinc-100">
          <label className="text-sm font-medium text-zinc-700">
            Há divergência entre familiares/cuidadores sobre limites, rotina, medicação, reabilitação ou finanças?
          </label>
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="familyDivergence"
                value="Não"
                checked={data.familyDivergence === 'Não'}
                onChange={(e) => onChange('familyDivergence', e.target.value)}
                className="w-5 h-5 text-apae-blue border-zinc-300 focus:ring-apae-blue"
              />
              <span className="text-sm font-medium text-zinc-700">Não</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="familyDivergence"
                value="Sim"
                checked={data.familyDivergence === 'Sim'}
                onChange={(e) => onChange('familyDivergence', e.target.value)}
                className="w-5 h-5 text-apae-blue border-zinc-300 focus:ring-apae-blue"
              />
              <span className="text-sm font-medium text-zinc-700">Sim</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <SynthesisField
            label="Síntese técnica do genograma:"
            value={data.professionalSynthesis}
            onChange={(value) => onChange('professionalSynthesis', value)}
            onGenerate={() =>
              onGenerateSynthesis('professionalSynthesis', 'Genograma', [
                'familyComposition',
                'familyArrangementOptions',
                'maritalStatusRelevance',
                'healthDecisionMaker',
                'familyDivergence',
              ])
            }
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}
