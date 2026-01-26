import { FieldError, UseFormRegister } from 'react-hook-form';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';

interface DescriptionSectionProps {
  descLength: number;
  register: UseFormRegister<CreateScheduleFormData>;
  error?: FieldError;
}

export default function DescriptionSection({
  descLength,
  register,
  error,
}: DescriptionSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        내용 설명
      </label>
      <div className="relative">
        <textarea
          {...register('description', {
            maxLength: {
              value: 50,
              message: '최대 50자까지 입력 가능합니다',
            },
          })}
          placeholder="미팅 내용이 있다면 입력하세요"
          rows={3}
          maxLength={50}
          className="w-full resize-none rounded-lg bg-bg-textfiled px-4 py-3 pb-8 text-body-5 text-tx-textfiled_disabled outline-none"
        />
        <span className="pointer-events-none absolute bottom-4 right-4 text-[12px] font-medium text-tx-default_4">
          {descLength}/50
        </span>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
