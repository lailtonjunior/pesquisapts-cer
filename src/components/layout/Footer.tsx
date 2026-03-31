import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface FooterProps {
  step: number;
  totalSteps: number;
  isGenerating: boolean;
  isSaving: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function Footer({ step, totalSteps, isGenerating, isSaving, onBack, onNext, onSubmit }: FooterProps) {
  const isLastFormStep = step === totalSteps - 1;

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-zinc-200 z-50 print:hidden"
    >
      <nav aria-label="Navegação do formulário" className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isGenerating}
          aria-label="Voltar ao passo anterior"
          className="flex items-center gap-2 px-6 py-3 text-zinc-500 hover:text-zinc-900 font-medium transition-colors rounded-full hover:bg-zinc-100 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        {isLastFormStep ? (
          <button
            onClick={onSubmit}
            disabled={isSaving}
            aria-label={isSaving ? 'Salvando formulário...' : 'Finalizar e enviar formulário'}
            className="flex items-center gap-2 px-8 py-3 bg-apae-blue text-white rounded-full font-medium hover:bg-apae-blue/90 transition-colors shadow-lg shadow-apae-blue/20 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <span>Finalizar</span>
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={isGenerating}
            aria-label={isGenerating ? 'Analisando, aguarde...' : 'Avançar para o próximo passo'}
            className="flex items-center gap-2 px-8 py-3 bg-apae-blue text-white rounded-full font-medium hover:bg-apae-blue/90 transition-colors shadow-lg shadow-apae-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analisando...</span>
              </>
            ) : (
              <>
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </nav>
    </motion.footer>
  );
}
