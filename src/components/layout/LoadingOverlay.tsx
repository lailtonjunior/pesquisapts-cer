import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <Loader2 className="w-16 h-16 text-apae-blue animate-spin mb-6" />
      <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight">Gerando Projeto Terapeutico Singular...</h3>
      <p className="text-zinc-500 mt-2 text-lg">A inteligencia artificial esta analisando os dados clinicos.</p>
    </motion.div>
  );
}
