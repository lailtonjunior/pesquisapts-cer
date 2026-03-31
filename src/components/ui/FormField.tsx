import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: boolean;
  id?: string;
  labelId?: string;
}

export function FormField({ label, children, required, error, id, labelId }: FormFieldProps) {
  const errorId = id ? `${id}-error` : undefined;
  return (
    <div
      role="group"
      aria-describedby={error && errorId ? errorId : undefined}
      className={`flex flex-col gap-2 ${error ? 'ring-2 ring-red-400 rounded-xl p-3' : ''}`}
    >
      <label id={labelId} htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && errorId && (
        <span id={errorId} className="sr-only" aria-live="polite">
          O campo {label} é obrigatório ou contém um erro.
        </span>
      )}
    </div>
  );
}
