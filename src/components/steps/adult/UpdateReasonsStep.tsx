import { ClipboardList } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import { UPDATE_REASONS } from '../../../constants/survey';
import { CheckboxGroup } from '../../ui/CheckboxGroup';
import { TextArea } from '../../ui/TextArea';

export function UpdateReasonsStep({
  data,
  onArrayChange,
  onChange,
}: StepProps) {
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 text-zinc-400 mb-4">
          <ClipboardList className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">2. Motivo da Atualização</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">Por que o PTS está sendo atualizado?</h2>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <CheckboxGroup
          options={UPDATE_REASONS}
          selected={data.updateReasons}
          onChange={(value) => onArrayChange('updateReasons', value)}
          columns={2}
        />

        <div className="pt-4 border-t border-zinc-100">
          <TextArea
            label="Descrição sucinta do motivo"
            value={data.updateReasonDescription}
            onChange={(value) => onChange('updateReasonDescription', value)}
            placeholder="Descreva brevemente..."
            rows={8}
          />
        </div>
      </div>
    </div>
  );
}
