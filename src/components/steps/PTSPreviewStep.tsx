import { BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { SurveyData } from '../../types/survey';

interface PTSPreviewStepProps {
  data: SurveyData;
  onChange: (field: keyof SurveyData, value: string) => void;
  onRegenerateAI: (instructions: string) => void;
  isGenerating: boolean;
}

export function PTSPreviewStep({ data, onChange, onRegenerateAI, isGenerating }: PTSPreviewStepProps) {
  return (
    <div className="space-y-8 w-full">
      <div className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 text-zinc-400 mb-4">
          <BrainCircuit className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">Formulário PTS Gerado por IA</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">Revisão do PTS</h2>
        <p className="text-zinc-500 text-lg leading-relaxed">
          A IA gerou o Formulário PTS com base na pesquisa. Você pode editar os campos abaixo ou fornecer instruções adicionais para a IA recriar o formulário.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6 text-left">
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-700">Instruções adicionais para a IA (opcional):</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <textarea
              id="additionalInstructions"
              placeholder="Ex: Foque mais na reabilitação motora..."
              className="flex-1 h-24 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const instructions = (document.getElementById("additionalInstructions") as HTMLTextAreaElement).value;
                onRegenerateAI(instructions);
              }}
              disabled={isGenerating}
              className="px-6 py-4 bg-apae-blue text-white rounded-xl font-medium hover:bg-apae-blue/90 transition-colors disabled:opacity-50 h-24 flex items-center justify-center"
            >
              {isGenerating ? "Recriando..." : "Recriar PTS"}
            </motion.button>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-zinc-100">
          <h3 className="text-xl font-semibold text-zinc-900">Campos do PTS</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Condição clínica e funcional</label>
              <textarea
                value={data.ptsClinicalCondition}
                onChange={(e) => onChange("ptsClinicalCondition", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Limitações de atividade</label>
              <textarea
                value={data.ptsActivityLimitations}
                onChange={(e) => onChange("ptsActivityLimitations", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Restrições de participação</label>
              <textarea
                value={data.ptsParticipationRestrictions}
                onChange={(e) => onChange("ptsParticipationRestrictions", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Fatores ambientais, familiares e sociais</label>
              <textarea
                value={data.ptsEnvironmentalFactors}
                onChange={(e) => onChange("ptsEnvironmentalFactors", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Facilitadores</label>
              <textarea
                value={data.ptsFacilitators}
                onChange={(e) => onChange("ptsFacilitators", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Barreiras</label>
              <textarea
                value={data.ptsBarriers}
                onChange={(e) => onChange("ptsBarriers", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Rotina diária</label>
              <textarea
                value={data.ptsRoutine}
                onChange={(e) => onChange("ptsRoutine", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Atividades regulares</label>
              <textarea
                value={data.ptsRegularActivities}
                onChange={(e) => onChange("ptsRegularActivities", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Condutas e intervenções previstas</label>
              <textarea
                value={data.ptsInterventions}
                onChange={(e) => onChange("ptsInterventions", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Observações Finais</label>
              <textarea
                value={data.ptsFinalObservations}
                onChange={(e) => onChange("ptsFinalObservations", e.target.value)}
                className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
