import { motion } from 'motion/react';
import { CheckCircle, Download, ClipboardList } from 'lucide-react';

interface CompletionStepProps {
  onPrint: () => void;
  onNewSurvey: () => void;
  onBackToDashboard?: () => void;
}

export function CompletionStep({ onPrint, onNewSurvey, onBackToDashboard }: CompletionStepProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-apae-green/10 text-apae-green rounded-full flex items-center justify-center"
      >
        <CheckCircle className="w-12 h-12" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h1 className="text-3xl font-bold text-zinc-900">Pesquisa Concluída</h1>
        <p className="text-zinc-500 max-w-sm mx-auto">
          Os dados foram registrados com sucesso. Você pode gerar o PDF do documento agora.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={onPrint}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-apae-green text-white rounded-full font-medium hover:bg-apae-green/90 transition-colors"
        >
          <Download className="w-5 h-5" />
          Gerar PDF
        </button>

        <button
          onClick={onNewSurvey}
          className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
        >
          Nova Pesquisa
        </button>

        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            Ver Pesquisas
          </button>
        )}
      </motion.div>
    </div>
  );
}
