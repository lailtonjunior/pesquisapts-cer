import { User } from 'lucide-react';
import { StepProps } from '../../types/survey';
import { TextInput } from '../ui/TextInput';
import { CheckboxGroup } from '../ui/CheckboxGroup';
import { MODALITY_OPTIONS } from '../../constants/survey';

export function IdentificationStep({
  data,
  onChange,
  onArrayChange,
  validationErrors,
}: StepProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-apae-blue text-white rounded-xl flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            1. Identificação do Usuário
          </p>
          <h2 className="text-xl font-bold text-zinc-900">Dados Pessoais e Clínicos</h2>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="md:col-span-2">
            <TextInput
              label="Nome do Usuário"
              value={data.userName}
              onChange={(value) => onChange('userName', value)}
              required
              error={validationErrors?.has('userName')}
            />
          </div>

          {/* Data de Nascimento */}
          <TextInput
            label="Data de Nascimento"
            value={data.birthDate}
            onChange={(value) => onChange('birthDate', value)}
            type="date"
            required
            error={validationErrors?.has('birthDate')}
          />

          {/* Idade */}
          <div>
            <TextInput
              label="Idade"
              value={data.age}
              onChange={() => {}}
              type="number"
              readOnly
              placeholder="Calculado automaticamente"
            />
          </div>

          {/* Diagnóstico */}
          <div className="md:col-span-2">
            <TextInput
              label="Diagnóstico"
              value={data.diagnosis}
              onChange={(value) => onChange('diagnosis', value)}
              required
              error={validationErrors?.has('diagnosis')}
            />
          </div>

          {/* Modalidade */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-zinc-700">Modalidade</label>
            <CheckboxGroup
              options={MODALITY_OPTIONS}
              selected={data.modality}
              onChange={(value) => onArrayChange('modality', value)}
              columns={3}
            />
          </div>

          {/* Data de Aplicação */}
          <TextInput
            label="Data de Aplicação"
            value={data.applicationDate}
            onChange={(value) => onChange('applicationDate', value)}
            type="date"
          />

          {/* Profissional */}
          <TextInput
            label="Profissional"
            value={data.professional}
            onChange={(value) => onChange('professional', value)}
            required
            error={validationErrors?.has('professional')}
          />

          {/* Contato do Cuidador */}
          <div className="md:col-span-2">
            <TextInput
              label="Contato do Cuidador"
              value={data.caregiverContact}
              onChange={(value) => onChange('caregiverContact', value)}
              placeholder="Se houver"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
