import { generateCalendarDates } from '@/shared/lib/date/generate-calendar-dates';
import { isSameDay } from '@/shared/lib/date/is-same-day';

import { cn } from '../config/tailwind/cn';

export interface CalendarEvent {
  id: string | number;
  date: string; // YYYY-MM-DD
  colorHex: string;
}

interface CalendarProps {
  currentDate: Date;
  selectedDate?: Date;
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  containerClassName?: string;
  disableBeforeToday?: boolean;
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'] as const;

export default function Calendar({
  currentDate,
  selectedDate,
  events = [],
  onDateSelect,
  containerClassName,
  disableBeforeToday = false,
}: CalendarProps) {
  const dates = generateCalendarDates(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventsByDate = events.reduce(
    (acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    },
    {} as Record<string, CalendarEvent[]>,
  );

  return (
    <div className={cn('px-5 pt-4', containerClassName)}>
      <div className="mb-2 flex items-center justify-between">
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

      <div className="flex flex-col items-start self-stretch">
        {Array.from({ length: 6 }).map((_, weekIndex) => (
          <div
            key={weekIndex}
            className="flex w-full items-center justify-between"
          >
            {dates.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => {
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const dateStart = new Date(date);
              dateStart.setHours(0, 0, 0, 0);
              const isDisabled = disableBeforeToday && dateStart <= today;
              const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              const dayEvents = eventsByDate[dateString] || [];

              return (
                <div key={dateString} className="flex flex-1 flex-col">
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) onDateSelect?.(date);
                    }}
                    className={cn(
                      'h-9 w-9 shrink-0 self-center rounded-xl text-body-4.1 flex-center',
                      'transition-colors duration-200',
                      {
                        'text-tx-default_5': !isCurrentMonth,
                        'text-white': isCurrentMonth,
                        'bg-bg-primary text-white hover:bg-bg-primary/80':
                          isToday && !isDisabled,
                        'border-[1.5px] border-bd-textfiled-line_focus text-white':
                          isSelected && !isToday && !isDisabled,
                        'hover:bg-white/10':
                          !isToday && !isSelected && !isDisabled,
                        'cursor-not-allowed text-tx-default_5 opacity-40':
                          isDisabled,
                      },
                    )}
                  >
                    {date.getDate()}
                  </button>

                  <div className="h-3 w-9 gap-0.5 self-center flex-center">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: event.colorHex,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
