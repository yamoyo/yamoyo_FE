import { FieldError, UseFormRegister } from 'react-hook-form';

import {
  CreateScheduleFormData,
  SCHEDULE_COLORS,
  ScheduleColorId,
} from '@/entities/calendar/model/types';

interface TitleSectionProps {
  selectedColor: ScheduleColorId;
  titleLength: number;
  isColorPickerOpen: boolean;
  onToggleColorPicker: () => void;
  onSelectColor: (colorId: ScheduleColorId) => void;
  register: UseFormRegister<CreateScheduleFormData>;
  error?: FieldError;
}

export default function TitleSection({
  selectedColor,
  titleLength,
  isColorPickerOpen,
  onToggleColorPicker,
  onSelectColor,
  register,
  error,
}: TitleSectionProps) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        미팅제목
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleColorPicker}
          className="h-5 w-5 shrink-0 rounded-full"
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
            className="w-full rounded-lg bg-bg-textfiled px-4 py-3 pr-14 text-body-5 text-tx-default outline-none placeholder:text-tx-textfiled_disabled"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-tx-default_4">
            {titleLength}/20
          </span>
        </div>
      </div>
      {isColorPickerOpen && (
        <div className="mt-3 flex items-center gap-[10px]">
          <button
            type="button"
            onClick={onToggleColorPicker}
            className="h-6 w-6 shrink-0"
            aria-label="색상 선택 닫기"
          >
            <img
              src="/assets/icons/color-select.svg"
              alt=""
              className="h-6 w-6"
            />
          </button>
          <div className="flex gap-[9px]">
            {SCHEDULE_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(color.id)}
                className={`h-9 w-9 rounded-full transition-all ${
                  selectedColor === color.id
                    ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#202540]'
                    : ''
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`${color.name} 색상`}
              />
            ))}
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
