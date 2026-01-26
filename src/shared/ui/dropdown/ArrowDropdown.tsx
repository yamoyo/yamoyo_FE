import { cn } from '@/shared/config/tailwind/cn';
import { useState } from 'react';

export interface ArrowDropdownOption<T extends string | number> {
  label: string;
  value: T;
}

interface ArrowDropdownProps<T extends string | number> {
  options: ArrowDropdownOption<T>[];
  value: T; // 현재 선택된 값
  onChange: (value: T) => void;
}

export default function ArrowDropdown<T extends string | number>({
  options,
  value,
  onChange,
}: ArrowDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((opt) => opt.value === value) ?? options[0];

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <span className="text-[15px] leading-[150%] tracking-[-0.41px] text-white">
          {selectedOption?.label}
        </span>
        <img
          className={cn(
            'inline-block transition-transform',
            isOpen ? 'rotate-180' : '',
          )}
          src="/assets/icons/arrow-down-polygon.svg"
          alt="Arrow Down"
          width={13}
          height={13}
        />
      </button>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full min-w-[120px] rounded-[8px] border border-slate-700 bg-[#1B1B1F] shadow-lg">
          {options.map((opt) => (
            <li key={String(opt.value)}>
              <button
                type="button"
                onMouseDown={() => handleSelect(opt.value)}
                className={cn(
                  'w-full px-3 py-[6px] text-left text-[15px] leading-[150%] tracking-[-0.41px] text-white transition-colors hover:bg-slate-700',
                  opt.value === value && 'bg-slate-700',
                )}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
