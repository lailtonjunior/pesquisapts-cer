import { Activity } from 'lucide-react';
import { StepProps } from '../../../types/survey';
import { INDEPENDENCE_OPTIONS, CHILD_SLEEP_OPTIONS } from '../../../constants/survey';
import { SynthesisField } from '../../ui/SynthesisField';

export function RoutineStep({
  data,
  onChange,
  onArrayChange,
  onGenerateSynthesis,
  isGenerating,
}: StepProps) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-zinc-900 mb-6 flex items-center gap-3">
        <Activity className="w-6 h-6 text-zinc-400" />
        1. Mapeamento da Rotina
      </h2>
      <p className="text-sm text-zinc-500 mb-8">
        Registrar preferencialmente a situação atual, considerando mudanças recentes no neurodesenvolvimento, na escola, no contexto familiar e na participação social da criança.
      </p>

      <div className="space-y-8">

        {/* 1.1 Organização geral do cotidiano */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">1.1 Organização geral do cotidiano</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Com quem a criança reside atualmente?</label>
              <input
                type="text"
                value={data.childLivesWith}
                onChange={(e) => onChange('childLivesWith', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem passa mais tempo com a criança?</label>
              <input
                type="text"
                value={data.childSpendsMostTimeWith}
                onChange={(e) => onChange('childSpendsMostTimeWith', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem organiza a rotina diária?</label>
              <input
                type="text"
                value={data.childOrganizesRoutine}
                onChange={(e) => onChange('childOrganizesRoutine', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Quem leva e busca em escola, terapias e consultas?</label>
              <input
                type="text"
                value={data.childAccompaniesDisplacements}
                onChange={(e) => onChange('childAccompaniesDisplacements', e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* 1.2 Rotina em dias úteis */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">1.2 Rotina em dias úteis</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Manhã - Como ocorre a rotina de acordar, higiene, vestir-se, alimentação e deslocamento?</label>
              <textarea
                value={data.childRoutineMorning}
                onChange={(e) => onChange('childRoutineMorning', e.target.value)}
                className="w-full h-24 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>

            <div className="space-y-4 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
              <h4 className="text-sm font-semibold text-zinc-800">Período escolar</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-600">Escola</label>
                  <input
                    type="text"
                    value={data.childSchoolName}
                    onChange={(e) => onChange('childSchoolName', e.target.value)}
                    className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-600">Turno</label>
                  <input
                    type="text"
                    value={data.childSchoolShift}
                    onChange={(e) => onChange('childSchoolShift', e.target.value)}
                    className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Participação, interação, resposta a comandos e comunicação</label>
                <textarea
                  value={data.childSchoolParticipation}
                  onChange={(e) => onChange('childSchoolParticipation', e.target.value)}
                  className="w-full h-20 p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue resize-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
              <h4 className="text-sm font-semibold text-zinc-800">Contraturno</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Terapias/atividades/consultas realizadas</label>
                <input
                  type="text"
                  value={data.childAfterSchoolTherapies}
                  onChange={(e) => onChange('childAfterSchoolTherapies', e.target.value)}
                  className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Quem acompanha?</label>
                <input
                  type="text"
                  value={data.childAfterSchoolAccompaniment}
                  onChange={(e) => onChange('childAfterSchoolAccompaniment', e.target.value)}
                  className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Como a criança responde a essas atividades?</label>
                <textarea
                  value={data.childAfterSchoolResponse}
                  onChange={(e) => onChange('childAfterSchoolResponse', e.target.value)}
                  className="w-full h-20 p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue resize-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
              <h4 className="text-sm font-semibold text-zinc-800">Tarde</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Com quem permanece?</label>
                <input
                  type="text"
                  value={data.childAfternoonStaysWith}
                  onChange={(e) => onChange('childAfternoonStaysWith', e.target.value)}
                  className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Brincadeiras, uso de telas e forma de solicitar objetos/ajuda</label>
                <textarea
                  value={data.childAfternoonActivities}
                  onChange={(e) => onChange('childAfternoonActivities', e.target.value)}
                  className="w-full h-20 p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue resize-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
              <h4 className="text-sm font-semibold text-zinc-800">Noite</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Quem assume os cuidados?</label>
                <input
                  type="text"
                  value={data.childNightCaregiver}
                  onChange={(e) => onChange('childNightCaregiver', e.target.value)}
                  className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-600">Como ocorre alimentação, banho, sono e organização para o dia seguinte?</label>
                <textarea
                  value={data.childNightRoutine}
                  onChange={(e) => onChange('childNightRoutine', e.target.value)}
                  className="w-full h-20 p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue resize-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 1.3 Final de semana e participação comunitária */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">1.3 Final de semana e participação comunitária</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Rotina do fim de semana</label>
              <textarea
                value={data.childWeekendRoutine}
                onChange={(e) => onChange('childWeekendRoutine', e.target.value)}
                className="w-full h-20 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Espaços comunitários, religiosos, culturais ou de lazer</label>
              <textarea
                value={data.childCommunitySpaces}
                onChange={(e) => onChange('childCommunitySpaces', e.target.value)}
                className="w-full h-20 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Mudanças importantes de comportamento em relação aos dias úteis</label>
              <textarea
                value={data.childBehaviorChanges}
                onChange={(e) => onChange('childBehaviorChanges', e.target.value)}
                className="w-full h-20 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* 1.4 Funcionalidade no cotidiano */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2">1.4 Funcionalidade no cotidiano</h3>

          <div className="space-y-6">
            {/* Alimentação */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Alimentação</label>
              <div className="flex flex-wrap gap-3 mb-2">
                {INDEPENDENCE_OPTIONS.map((option) => (
                  <label key={`feeding-${option}`} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 border-2 border-zinc-300 rounded-full group-hover:border-apae-blue transition-colors">
                      {data.childFeedingIndependence === option && <div className="w-2.5 h-2.5 bg-apae-blue rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={data.childFeedingIndependence === option}
                      onChange={() => onChange('childFeedingIndependence', option)}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="Observações"
                value={data.childFeedingObservations}
                onChange={(e) => onChange('childFeedingObservations', e.target.value)}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
              />
            </div>

            {/* Banho / higiene */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Banho / higiene</label>
              <div className="flex flex-wrap gap-3 mb-2">
                {INDEPENDENCE_OPTIONS.map((option) => (
                  <label key={`hygiene-${option}`} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 border-2 border-zinc-300 rounded-full group-hover:border-apae-blue transition-colors">
                      {data.childHygieneIndependence === option && <div className="w-2.5 h-2.5 bg-apae-blue rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={data.childHygieneIndependence === option}
                      onChange={() => onChange('childHygieneIndependence', option)}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="Observações"
                value={data.childHygieneObservations}
                onChange={(e) => onChange('childHygieneObservations', e.target.value)}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
              />
            </div>

            {/* Vestir-se */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Vestir-se</label>
              <div className="flex flex-wrap gap-3 mb-2">
                {INDEPENDENCE_OPTIONS.map((option) => (
                  <label key={`dressing-${option}`} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 border-2 border-zinc-300 rounded-full group-hover:border-apae-blue transition-colors">
                      {data.childDressingIndependence === option && <div className="w-2.5 h-2.5 bg-apae-blue rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={data.childDressingIndependence === option}
                      onChange={() => onChange('childDressingIndependence', option)}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="Observações"
                value={data.childDressingObservations}
                onChange={(e) => onChange('childDressingObservations', e.target.value)}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
              />
            </div>

            {/* Sono */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Sono</label>
              <div className="flex flex-wrap gap-3 mb-2">
                {CHILD_SLEEP_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${data.childSleepOptions.includes(option) ? 'bg-apae-blue border-apae-blue' : 'border-zinc-300 group-hover:border-apae-blue'}`}>
                      {data.childSleepOptions.includes(option) && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={data.childSleepOptions.includes(option)}
                      onChange={() => onArrayChange('childSleepOptions', option)}
                    />
                    <span className="text-sm text-zinc-600 group-hover:text-apae-blue">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="Outros / Observações"
                value={data.childSleepObservations}
                onChange={(e) => onChange('childSleepObservations', e.target.value)}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apae-blue transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Interesses, brincadeiras e lazer</label>
              <textarea
                value={data.childInterests}
                onChange={(e) => onChange('childInterests', e.target.value)}
                className="w-full h-20 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>

            <SynthesisField
              label="Síntese técnica do mapeamento da rotina"
              value={data.childRoutineSynthesis}
              onChange={(value) => onChange('childRoutineSynthesis', value)}
              onGenerate={() =>
                onGenerateSynthesis('childRoutineSynthesis', 'Mapeamento da Rotina', [
                  'childRoutineMorning', 'childSchoolName', 'childSchoolShift', 'childSchoolParticipation',
                  'childAfterSchoolTherapies', 'childAfterSchoolAccompaniment', 'childAfterSchoolResponse',
                  'childAfternoonStaysWith', 'childAfternoonActivities', 'childNightCaregiver', 'childNightRoutine',
                  'childWeekendRoutine', 'childCommunitySpaces', 'childBehaviorChanges',
                  'childFeedingIndependence', 'childFeedingObservations', 'childHygieneIndependence',
                  'childHygieneObservations', 'childDressingIndependence', 'childDressingObservations',
                  'childSleepOptions', 'childSleepObservations', 'childInterests',
                ])
              }
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
