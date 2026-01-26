import { cn } from '@/shared/config/tailwind/cn';

interface DeadlineFieldProps {
  label?: string;
  required?: boolean;
  displayLabel: string;
  isSelected: boolean;
  onOpen: () => void;
}

export default function DeadlineField({
  label = '마감일',
  required = true,
  displayLabel,
  isSelected,
  onOpen,
}: DeadlineFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-body-4.1">
        <span className="text-tx-default_3">{label}</span>
        {required && <span className="text-bg-secondary_2">*</span>}
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-bd-default bg-bg-textfiled px-[15px] text-left text-body-4.1 text-tx-default"
      >
        <span
          className={cn(
            'text-body-4.1',
            isSelected ? 'text-tx-default' : 'text-tx-textfiled_disabled',
          )}
        >
          {displayLabel}
        </span>
        <img
          src="/assets/icons/calendar.svg"
          alt=""
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
