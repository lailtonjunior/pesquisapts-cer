import { CheckCircle } from 'lucide-react';

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  columns?: number;
  ariaLabel?: string;
}

const colsMap: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function CheckboxGroup({ options, selected, onChange, columns = 2, ariaLabel }: CheckboxGroupProps) {
  const colClass = colsMap[columns] ?? 'md:grid-cols-2';

  return (
    <div role="group" aria-label={ariaLabel} className={`grid grid-cols-1 ${colClass} gap-2`}>
      {options.map((option) => {
        const isChecked = selected.includes(option);
        return (
          <label
            key={option}
            className="relative flex items-center gap-3 p-3 rounded-xl border border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-all"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onChange(option)}
              aria-label={option}
              className="peer appearance-none w-5 h-5 shrink-0 rounded-md border-2 border-zinc-300 checked:border-apae-blue checked:bg-apae-blue transition-all"
            />
            <CheckCircle
              className={`absolute left-3 w-5 h-5 pointer-events-none transition-opacity ${
                isChecked ? 'opacity-100 text-white' : 'opacity-0'
              }`}
            />
            <span className="text-sm text-zinc-700 select-none">{option}</span>
          </label>
        );
      })}
    </div>
  );
}
