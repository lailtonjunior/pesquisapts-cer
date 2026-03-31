import { BrainCircuit, Loader2 } from 'lucide-react';

interface SynthesisFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function SynthesisField({
  label,
  value,
  onChange,
  onGenerate,
  isGenerating,
}: SynthesisFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700">{label}</label>
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="flex items-center gap-1.5 text-xs bg-apae-blue text-white px-3 py-1.5 rounded-lg hover:bg-apae-blue/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <BrainCircuit className="w-3.5 h-3.5" />
          )}
          {isGenerating ? 'Gerando...' : 'Gerar Síntese'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full h-32 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all"
      />
    </div>
  );
}
