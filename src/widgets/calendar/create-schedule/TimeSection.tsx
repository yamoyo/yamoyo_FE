import { useEffect, useRef, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { CreateScheduleFormData } from '@/entities/calendar/model/types';
import ClockIcon from '@/shared/assets/icons/Clock.svg?react';

interface TimeSectionProps {
  timeOptions: string[];
  register: UseFormRegister<CreateScheduleFormData>;
  startTime?: string;
  endTime?: string;
  startTimeError?: FieldError;
  endTimeError?: FieldError;
  onStartTimeChange: () => void;
  onSelectStartTime: (startTime: string) => void;
  onSelectDuration: (endTime: string) => void;
}

const durationCandidates = [30, 60, 90, 120];

export default function TimeSection({
  timeOptions,
  register,
  startTime,
  endTime,
  startTimeError,
  endTimeError,
  onStartTimeChange,
  onSelectStartTime,
  onSelectDuration,
}: TimeSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startTimeOptions = timeOptions.filter(
    (option) => option.endsWith(':00') && option <= '23:00',
  );

  const toMinutes = (value: string) => {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  };

  const toTimeString = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  const durationOptions =
    startTime !== undefined && startTime !== ''
      ? durationCandidates
          .map((minutes) => {
            const endMinutes = toMinutes(startTime) + minutes;
            if (endMinutes > 24 * 60) return null;
            const end = toTimeString(endMinutes);
            return {
              minutes,
              endTime: end,
              label: `${startTime} ~ ${end}`,
            };
          })
          .filter(
            (
              option,
            ): option is { minutes: number; endTime: string; label: string } =>
              option !== null,
          )
      : [];

  const startTimeField = register('startTime', {
    required: '시작 시간을 선택해주세요',
  });

  const handleSelectStartTime = (value: string) => {
    onSelectStartTime(value);
    onStartTimeChange();
    setIsOpen(false);
  };

  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        미팅 시간
      </label>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded-lg bg-bg-textfiled px-4 py-3 text-body-5 outline-none ${
            startTime ? 'text-white' : 'text-tx-textfiled_disabled'
          }`}
        >
          <span>{startTime || '시작 시간 선택'}</span>
          <img
            src="/assets/icons/arrow-down.svg"
            alt=""
            className={`h-4 w-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-bd-textfiled_line bg-bg-textfiled py-1 shadow-lg">
            {startTimeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectStartTime(option)}
                className="w-full px-4 py-2 text-left text-body-5 text-white hover:bg-white/10"
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <input type="hidden" {...startTimeField} />
        <img
          src="/assets/icons/arrow-down.svg"
          alt=""
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-0"
          aria-hidden="true"
        />
      </div>

      <input
        type="hidden"
        {...register('endTime', {
          required: '소요 시간을 선택해주세요',
        })}
      />

      {startTime && (
        <div className="select-none" draggable="false">
          <p className="mt-3 text-body-5 text-tx-default_3">
            Duration(소요시간)
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {durationOptions.map((option) => (
              <button
                key={option.endTime}
                type="button"
                onClick={() => onSelectDuration(option.endTime)}
                className={`gap-2 rounded-lg px-3 py-3 text-body-4 transition-colors flex-center ${
                  endTime === option.endTime
                    ? 'border-textfiled-line_focus bg-bg-secondary_2 text-tx-default_black'
                    : 'border-bd-textfiled_line bg-bg-textfiled text-tx-default_4'
                }`}
              >
                <ClockIcon className="size-[18.33px]" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {startTimeError && (
        <p className="mt-1 text-xs text-red-400">{startTimeError.message}</p>
      )}
      {endTimeError && (
        <p className="mt-1 text-xs text-red-400">{endTimeError.message}</p>
      )}
    </div>
  );
}
