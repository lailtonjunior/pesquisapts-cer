interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export function RadioGroup({ options, value, onChange, ariaLabel }: RadioGroupProps) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-col gap-2">
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <label
            key={option}
            className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-all"
          >
            <div
              className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected ? 'border-apae-blue' : 'border-zinc-300'
              }`}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-apae-blue" />
              )}
            </div>
            <input
              type="radio"
              value={option}
              checked={isSelected}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span className="text-sm text-zinc-700 select-none">{option}</span>
          </label>
        );
      })}
    </div>
  );
}
