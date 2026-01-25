import { generateCalendarDates } from '@/entities/calendar/lib/generate-calendar-dates';
import { isSameDay } from '@/entities/calendar/lib/is-same-day';
import { cn } from '../config/tailwind/cn';

interface CalendarProps {
  currentDate: Date;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'] as const;

export default function Calendar({
  currentDate,
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  const dates = generateCalendarDates(currentDate);

  return (
    <div className="px-5 py-4">
      <div className="mb-2 flex items-center gap-5">
        {weekDays.map((day) => (
          <div
            key={day}
            className="flex-1 py-2 text-center text-body-4.1 text-tx-default"
          >
            {day}
          </div>
        ))}
      </div>

      <hr className="mb-2 border-gray-700" />

      <div className="flex flex-col items-start gap-7 self-stretch">
        {Array.from({ length: 6 }).map((_, weekIndex) => (
          <div
            key={weekIndex}
            className="flex w-full items-center justify-between"
          >
            {dates
              .slice(weekIndex * 7, weekIndex * 7 + 7)
              .map((date, dayIndex) => {
                const isSelected =
                  selectedDate && isSameDay(date, selectedDate);
                const isToday = isSameDay(date, new Date());
                const isCurrentMonth =
                  date.getMonth() === currentDate.getMonth();

                return (
                  <button
                    key={dayIndex}
                    onClick={() => onDateSelect?.(date)}
                    className={cn(
                      'h-9 w-9 shrink-0 rounded-xl text-body-4.1 flex-center',
                      'transition-colors duration-200',
                      {
                        'text-gray-600': !isCurrentMonth,
                        'text-white': isCurrentMonth,
                        'bg-bg-primary text-white hover:bg-bg-primary/80':
                          isToday,
                        'bg-purple-100 text-[#804FFF] hover:bg-purple-100/80':
                          isSelected && !isToday,
                        'hover:bg-white/10': !isToday && !isSelected,
                      },
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
