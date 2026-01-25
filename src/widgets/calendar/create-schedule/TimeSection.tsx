import { UseFormRegister } from 'react-hook-form';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';

interface TimeSectionProps {
  timeOptions: string[];
  register: UseFormRegister<CreateScheduleFormData>;
}

export default function TimeSection({
  timeOptions,
  register,
}: TimeSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white">미팅 시간</label>
      <div className="relative">
        <select
          {...register('time')}
          className="w-full appearance-none rounded-lg bg-bg-textfiled px-4 py-3 pr-12 text-body-5 text-white outline-none"
        >
          {timeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <img
          src="/assets/icons/arrow-down.svg"
          alt=""
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
