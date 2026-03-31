import { FormField } from './FormField';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: 'text' | 'date' | 'number';
  required?: boolean;
  error?: boolean;
  id?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  type = 'text',
  required,
  error,
  id,
}: TextInputProps) {
  const labelId = id ? `${id}-label` : undefined;
  return (
    <FormField label={label} required={required} id={id} labelId={labelId}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-labelledby={labelId}
        className={`w-full p-4 bg-zinc-50 border rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-apae-blue focus:bg-white transition-all ${
          error ? 'border-red-400' : 'border-zinc-200'
        } ${readOnly ? 'cursor-not-allowed opacity-60' : ''}`}
      />
    </FormField>
  );
}
