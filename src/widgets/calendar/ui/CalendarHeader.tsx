import { formatYearMonth } from '@/entities/calendar/lib/utils/format-date';
import { cn } from '@/shared/config/tailwind/cn';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  className?: string;
  labelClassName?: string;
  todayButtonClassName?: string;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  className,
  labelClassName,
  todayButtonClassName,
}: CalendarHeaderProps) {
  return (
    <div
      className={cn('flex items-center justify-between px-5 pt-6', className)}
    >
      <div className="flex items-center gap-2">
        <button type="button" onClick={onPrevMonth} className="select-none p-1">
          <img
            src={'/assets/icons/arrow-left.svg'}
            width={9}
            height={16}
            draggable="false"
          />
        </button>

        <span
          className={cn(
            'min-w-[101px] text-center text-title-2 text-white',
            labelClassName,
          )}
        >
          {formatYearMonth(currentDate)}
        </span>

        <button type="button" onClick={onNextMonth} className="select-none p-1">
          <img
            src={'/assets/icons/arrow-left.svg'}
            className="scale-x-[-1]"
            width={9}
            height={16}
            draggable="false"
          />
        </button>
      </div>

      <button
        type="button"
        onClick={onToday}
        className={cn(
          'rounded-2xl bg-bd-textfiled_line px-[12px] py-[4px] text-body-4 text-tx-default_3',
          todayButtonClassName,
        )}
      >
        오늘
      </button>
    </div>
  );
}
