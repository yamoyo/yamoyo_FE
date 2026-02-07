import { UseFormRegister } from 'react-hook-form';

import { CreateScheduleFormData } from '@/entities/calendar/model/types';

interface LocationSectionProps {
  register: UseFormRegister<CreateScheduleFormData>;
  placeholder?: string;
}

export default function LocationSection({
  register,
  placeholder = '장소 혹은 플랫폼을 입력해주세요',
}: LocationSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        모임장소
      </label>
      <input
        {...register('location')}
        placeholder={placeholder}
        className="w-full rounded-lg bg-bg-textfiled px-4 py-3 text-body-5 text-tx-default outline-none placeholder:text-tx-textfiled_disabled"
      />
    </div>
  );
}
