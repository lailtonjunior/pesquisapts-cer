import { FormField } from './FormField';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: boolean;
}

const rowHeightMap: Record<number, string> = {
  4: 'h-16',
  6: 'h-24',
  8: 'h-32',
  10: 'h-40',
  12: 'h-48',
  16: 'h-64',
};

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  required,
  error,
}: TextAreaProps) {
  const heightClass = rowHeightMap[rows] ?? 'h-24';

  return (
    <FormField label={label} required={required}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        className={`w-full ${heightClass} p-4 bg-zinc-50 border rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white resize-none transition-all ${
          error ? 'border-red-400' : 'border-zinc-200'
        }`}
      />
    </FormField>
  );
}
