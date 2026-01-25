import { UseFormRegister } from 'react-hook-form';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';

interface LocationSectionProps {
  register: UseFormRegister<CreateScheduleFormData>;
}

export default function LocationSection({ register }: LocationSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white">장소</label>
      <input
        {...register('location')}
        placeholder="장소 혹은 플랫폼을 입력해주세요"
        className="w-full rounded-lg bg-bg-textfiled px-4 py-3 text-body-5 text-white outline-none"
      />
    </div>
  );
}
