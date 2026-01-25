import { FieldError, UseFormRegister } from 'react-hook-form';
import {
  CreateScheduleFormData,
  SCHEDULE_COLORS,
} from '@/entities/calendar/model/types';

interface TitleSectionProps {
  selectedColor: string;
  titleLength: number;
  onToggleColorPicker: () => void;
  register: UseFormRegister<CreateScheduleFormData>;
  error?: FieldError;
}

export default function TitleSection({
  selectedColor,
  titleLength,
  onToggleColorPicker,
  register,
  error,
}: TitleSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white">미팅제목</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleColorPicker}
          className="h-5 w-5 shrink-0 rounded-full ring-2 ring-white ring-offset-2 ring-offset-[#202540]"
          style={{
            backgroundColor:
              SCHEDULE_COLORS.find((c) => c.id === selectedColor)?.hex ||
              selectedColor,
          }}
          aria-label="일정 색상 선택"
        />
        <div className="relative flex-1">
          <input
            {...register('title', {
              required: '미팅 제목을 입력해주세요',
              maxLength: {
                value: 20,
                message: '최대 20자까지 입력 가능합니다',
              },
            })}
            placeholder="미팅 제목을 입력하세요"
            maxLength={20}
            className="w-full rounded-lg bg-bg-textfiled px-4 py-3 pr-14 text-body-5 text-white outline-none"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {titleLength}/20
          </span>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
