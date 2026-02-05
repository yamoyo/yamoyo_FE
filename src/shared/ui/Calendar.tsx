import type { MeetingSummary } from '@/entities/calendar/api/meeting-dto';
import { generateCalendarDates } from '@/entities/calendar/lib/generate-calendar-dates';
import { isSameDay } from '@/entities/calendar/lib/is-same-day';
import { MEETING_COLOR_MAP } from '@/entities/calendar/model/types';

import { cn } from '../config/tailwind/cn';

interface CalendarProps {
  currentDate: Date;
  selectedDate?: Date;
  meetings?: MeetingSummary[];
  onDateSelect?: (date: Date) => void;
  containerClassName?: string;
  disableBeforeToday?: boolean;
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'] as const;

export default function Calendar({
  currentDate,
  selectedDate,
  meetings = [],
  onDateSelect,
  containerClassName,
  disableBeforeToday = false,
}: CalendarProps) {
  const dates = generateCalendarDates(currentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const meetingsByDate = meetings.reduce(
    (acc, meeting) => {
      const date = meeting.startTime.split('T')[0]; // "2025-02-15T14:00:00" → "2025-02-15"
      if (!acc[date]) acc[date] = [];
      acc[date].push(meeting);
      return acc;
    },
    {} as Record<string, MeetingSummary[]>,
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
              const dayMeetings = meetingsByDate[dateString] || [];

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
                        'border-[1.5px] border-textfiled-line_focus text-white':
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
                    {dayMeetings.slice(0, 2).map((meeting) => (
                      <div
                        key={meeting.meetingId}
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: MEETING_COLOR_MAP[meeting.color],
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
