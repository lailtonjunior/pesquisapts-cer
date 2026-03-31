import { motion } from 'motion/react';
import { ArrowLeft, ClipboardList, LogOut } from 'lucide-react';

interface HeaderProps {
  surveyType: 'adult' | 'child' | '';
  step: number;
  totalSteps: number;
  userName?: string;
  onSignOut?: () => void;
  onBackToDashboard?: () => void;
}

export function Header({ surveyType, step, totalSteps, userName, onSignOut, onBackToDashboard }: HeaderProps) {
  const lastFormStep = totalSteps - 2;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 z-50 flex items-center px-6">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              title="Voltar ao painel"
              className="flex items-center gap-1 px-2 py-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
            <ClipboardList className="w-4 h-4" />
            <span>{surveyType === 'adult' ? 'Pesquisa Adulto' : 'Pesquisa Infantil'} - CER</span>
          </div>
        </div>
        <nav className="flex items-center gap-4" aria-label="Progresso do formulário">
          <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">
            Passo {step} de {lastFormStep}
          </span>
          <div className="w-32 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div
              role="progressbar"
              aria-valuenow={Math.round((step / lastFormStep) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso: passo ${step} de ${lastFormStep}`}
              className="h-full bg-apae-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / lastFormStep) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          {onSignOut && (
            <button
              onClick={onSignOut}
              title={userName ? `Sair (${userName})` : 'Sair'}
              aria-label={userName ? `Sair da conta de ${userName}` : 'Sair'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
