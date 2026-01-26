import { FieldError, UseFormRegister } from 'react-hook-form';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';
import { useModalStore } from '@/shared/ui/modal/model/choice-modal-store';

interface DateSectionProps {
  title: string;
  dateLabel: string;
  register: UseFormRegister<CreateScheduleFormData>;
  error?: FieldError;
  selectedDate?: Date;
  onDateSelect: (selected: Date) => void;
}

export default function DateSection({
  title,
  dateLabel,
  register,
  error,
  selectedDate,
  onDateSelect,
}: DateSectionProps) {
  const openCalendarModal = useModalStore((s) => s.openCalendarModal);

  const handleOpenCalendar = () => {
    openCalendarModal({
      selectedDate,
      onSelectDate: onDateSelect,
    });
  };

  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        {title}
      </label>
      <button
        type="button"
        onClick={handleOpenCalendar}
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
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
