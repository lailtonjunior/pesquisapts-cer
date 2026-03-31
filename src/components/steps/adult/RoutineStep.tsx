import { Activity } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import { FUNCTIONALITY_OPTIONS } from '../../../constants/survey';
import { TextInput } from '../../ui/TextInput';
import { TextArea } from '../../ui/TextArea';
import { CheckboxGroup } from '../../ui/CheckboxGroup';
import { SynthesisField } from '../../ui/SynthesisField';

export function RoutineStep({
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
          <Activity className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">3. Mapeamento da Rotina</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">Organização e Funcionalidade</h2>
      </div>

      {/* 3.1 Organização geral do cotidiano */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">3.1 Organização geral do cotidiano</h3>
        <div className="grid grid-cols-1 gap-6">
          <TextInput
            label="Com quem o usuário mora atualmente?"
            value={data.livesWith}
            onChange={(value) => onChange('livesWith', value)}
          />
          <TextInput
            label="Quem passa mais tempo com o usuário no dia a dia?"
            value={data.spendsMostTimeWith}
            onChange={(value) => onChange('spendsMostTimeWith', value)}
          />
          <TextInput
            label="Quem organiza a rotina, consultas, terapias e medicações?"
            value={data.organizesRoutine}
            onChange={(value) => onChange('organizesRoutine', value)}
          />
          <TextInput
            label="Quem acompanha deslocamentos e atendimentos?"
            value={data.accompaniesDisplacements}
            onChange={(value) => onChange('accompaniesDisplacements', value)}
          />
        </div>
      </div>

      {/* 3.2 Rotina em dias úteis */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">3.2 Rotina em dias úteis</h3>
        <div className="grid grid-cols-1 gap-6">
          <TextArea
            label="Manhã - como ocorre o despertar, higiene, alimentação, deslocamento e necessidade de ajuda/supervisão?"
            value={data.routineMorning}
            onChange={(value) => onChange('routineMorning', value)}
            rows={6}
          />
          <TextArea
            label="Período principal de ocupação - trabalho, atividades domésticas, estudos, permanência no domicílio ou outro contexto:"
            value={data.routineMainPeriod}
            onChange={(value) => onChange('routineMainPeriod', value)}
            rows={6}
          />
          <TextArea
            label="Tarde / Noite - descreva atividades habituais, lazer, visitas, compromissos, uso de telas, sono e rotina medicamentosa:"
            value={data.routineAfternoonNight}
            onChange={(value) => onChange('routineAfternoonNight', value)}
            rows={6}
          />
        </div>
      </div>

      {/* 3.3 Funcionalidade e participação */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <h3 className="text-xl font-semibold text-zinc-800 border-b border-zinc-100 pb-4">3.3 Funcionalidade e participação</h3>
        <CheckboxGroup
          options={FUNCTIONALITY_OPTIONS}
          selected={data.functionalityOptions}
          onChange={(value) => onArrayChange('functionalityOptions', value)}
          columns={2}
        />

        <div className="pt-4 border-t border-zinc-100">
          <TextArea
            label="Principais dificuldades funcionais referidas (mobilidade, comunicação, autocuidado, participação social, dor, comportamento, memória, visão, audição etc.):"
            value={data.mainDifficulties}
            onChange={(value) => onChange('mainDifficulties', value)}
            rows={8}
          />
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <SynthesisField
            label="Síntese técnica do mapeamento da rotina:"
            value={data.routineSynthesis}
            onChange={(value) => onChange('routineSynthesis', value)}
            onGenerate={() =>
              onGenerateSynthesis('routineSynthesis', 'Mapeamento da Rotina', [
                'livesWith',
                'spendsMostTimeWith',
                'organizesRoutine',
                'accompaniesDisplacements',
                'routineMorning',
                'routineMainPeriod',
                'routineAfternoonNight',
                'functionalityOptions',
                'mainDifficulties',
              ])
            }
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}
