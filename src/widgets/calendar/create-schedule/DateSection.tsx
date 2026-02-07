import { FieldError, UseFormRegister } from 'react-hook-form';

import { useModalStore } from '@/shared/ui/modal/model/modal-store';

interface DateSectionProps<T extends { startDate: string }> {
  title: string;
  dateLabel: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  selectedDate?: Date;
  onDateSelect: (selected: Date) => void;
}

export default function DateSection<T extends { startDate: string }>({
  title,
  dateLabel,
  register,
  error,
  selectedDate,
  onDateSelect,
}: DateSectionProps<T>) {
  const openCalendarModal = useModalStore((s) => s.openCalendarModal);

  const handleOpenCalendar = () => {
    openCalendarModal({
      selectedDate,
      onSelectDate: onDateSelect,
    });
  };

  return (
    <div>
      <label className="mb-2 block text-body-5 text-tx-default_3">
        {title}
      </label>
      <button
        type="button"
        onClick={handleOpenCalendar}
        className="flex w-full items-center justify-between rounded-lg bg-bg-textfiled px-4 py-3 text-left text-body-5 text-white"
      >
        <span
          className={selectedDate ? 'text-white' : 'text-tx-textfiled_disabled'}
        >
          {dateLabel}
        </span>
        <img
          src="/assets/icons/calendar.svg"
          alt=""
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>
      <input
        type="hidden"
        {...register('startDate', {
          required: '날짜를 선택해주세요',
        })}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
