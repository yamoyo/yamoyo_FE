import { generateCalendarDates } from '@/entities/calendar/lib/generate-calendar-dates';
import { isSameDay } from '@/entities/calendar/lib/is-same-day';
import { Schedule, SCHEDULE_COLORS } from '@/entities/calendar/model/types';

import { cn } from '../config/tailwind/cn';

interface CalendarProps {
  currentDate: Date;
  selectedDate?: Date;
  schedules?: Schedule[];
  onDateSelect?: (date: Date) => void;
  containerClassName?: string;
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'] as const;

export default function Calendar({
  currentDate,
  selectedDate,
  schedules = [],
  onDateSelect,
  containerClassName,
}: CalendarProps) {
  const dates = generateCalendarDates(currentDate);

  const schedulesByDate = schedules.reduce(
    (acc, schedule) => {
      if (!acc[schedule.date]) acc[schedule.date] = [];
      acc[schedule.date].push(schedule);
      return acc;
    },
    {} as Record<string, Schedule[]>,
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
              const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              const daySchedules = schedulesByDate[dateString] || [];

              return (
                <div key={dateString} className="flex flex-1 flex-col">
                  <button
                    onClick={() => onDateSelect?.(date)}
                    className={cn(
                      'h-9 w-9 shrink-0 self-center rounded-xl text-body-4.1 flex-center',
                      'transition-colors duration-200',
                      {
                        'text-tx-default_5': !isCurrentMonth,
                        'text-white': isCurrentMonth,
                        'bg-bg-primary text-white hover:bg-bg-primary/80':
                          isToday,
                        'border-[1.5px] border-textfiled-line_focus text-white':
                          isSelected && !isToday,
                        'hover:bg-white/10': !isToday && !isSelected,
                      },
                    )}
                  >
                    {date.getDate()}
                  </button>

                  <div className="h-3 w-9 gap-0.5 self-center flex-center">
                    {daySchedules.slice(0, 2).map((schedule) => (
                      <div
                        key={schedule.id}
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            SCHEDULE_COLORS.find((c) => c.id === schedule.color)
                              ?.hex || schedule.color,
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
