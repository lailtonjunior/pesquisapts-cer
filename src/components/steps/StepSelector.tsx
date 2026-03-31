import { motion } from 'motion/react';
import { ClipboardList, User, Users } from 'lucide-react';

interface StepSelectorProps {
  onSelect: (type: 'adult' | 'child') => void;
}

export function StepSelector({ onSelect }: StepSelectorProps) {
  return (
    <div role="main" className="flex flex-col items-center justify-center min-h-[60vh] gap-10 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 bg-apae-blue text-white rounded-2xl flex items-center justify-center">
          <ClipboardList className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900">Selecione o tipo de pesquisa</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('adult')}
          aria-label="Selecionar Pesquisa Adulto: formulário para pacientes adultos"
          className="p-8 bg-white border-2 border-zinc-200 rounded-3xl hover:border-apae-blue transition-colors group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-apae-blue"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-zinc-100 group-hover:bg-apae-blue rounded-2xl flex items-center justify-center transition-colors">
              <User className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">Pesquisa Adulto</h2>
              <p className="text-sm text-zinc-500 mt-1">Formulário para pacientes adultos</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('child')}
          aria-label="Selecionar Pesquisa Infantil: formulário para pacientes infantis"
          className="p-8 bg-white border-2 border-zinc-200 rounded-3xl hover:border-apae-blue transition-colors group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-apae-blue"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-zinc-100 group-hover:bg-apae-blue rounded-2xl flex items-center justify-center transition-colors">
              <Users className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">Pesquisa Infantil</h2>
              <p className="text-sm text-zinc-500 mt-1">Formulário para pacientes infantis</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
