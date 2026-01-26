import { FieldError, UseFormRegister } from 'react-hook-form';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';
import Calendar from '@/shared/ui/Calendar';
import CalendarHeader from '@/widgets/calendar/ui/CalendarHeader';

interface DateSectionProps {
  dateLabel: string;
  isCalendarOpen: boolean;
  register: UseFormRegister<CreateScheduleFormData>;
  error?: FieldError;
  calendarCurrentDate: Date;
  selectedDate?: Date;
  onToggleCalendar: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onDateSelect: (selected: Date) => void;
}

export default function DateSection({
  dateLabel,
  isCalendarOpen,
  register,
  error,
  calendarCurrentDate,
  selectedDate,
  onToggleCalendar,
  onPrevMonth,
  onNextMonth,
  onToday,
  onDateSelect,
}: DateSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        미팅 날짜
      </label>
      <button
        type="button"
        onClick={onToggleCalendar}
        className="flex w-full items-center justify-between rounded-lg bg-bg-textfiled px-4 py-3 text-left text-body-5 text-white"
      >
        <span>{dateLabel}</span>
        <img
          src="/assets/icons/calendar.svg"
          alt=""
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>
      <input
        type="hidden"
        {...register('date', {
          required: '날짜를 선택해주세요',
        })}
      />
      {isCalendarOpen && (
        <div className="mt-3 rounded-2xl border border-gray-700 bg-[#1b1f36] p-2">
          <div className="flex justify-center">
            <div className="w-fit origin-top scale-[0.9]">
              <CalendarHeader
                currentDate={calendarCurrentDate}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
                onToday={onToday}
              />
              <Calendar
                currentDate={calendarCurrentDate}
                selectedDate={selectedDate}
                onDateSelect={onDateSelect}
              />
            </div>
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
