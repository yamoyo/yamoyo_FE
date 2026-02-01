import { useRef } from 'react';
import { cn } from '@/shared/config/tailwind/cn';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const TIME_SLOTS = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

const TIME_LABELS = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 8;
  return `${hour.toString().padStart(2, '0')}:00`;
});

interface TimePickGridProps {
  isEditMode: boolean;
  availability: boolean[][];
  onAvailabilityChange: (availability: boolean[][]) => void;
}

export default function TimePickGrid({
  isEditMode,
  availability,
  onAvailabilityChange,
}: TimePickGridProps) {
  const isDragging = useRef(false);
  const dragValue = useRef<boolean>(true);

  const toggleCell = (dayIndex: number, slotIndex: number) => {
    const newAvailability = availability.map((day) => [...day]);
    newAvailability[dayIndex][slotIndex] = dragValue.current;
    onAvailabilityChange(newAvailability);
  };

  const handlePointerDown = (dayIndex: number, slotIndex: number) => {
    if (!isEditMode) return;
    isDragging.current = true;
    dragValue.current = !availability[dayIndex][slotIndex];
    toggleCell(dayIndex, slotIndex);
  };

  const handlePointerEnter = (dayIndex: number, slotIndex: number) => {
    if (!isEditMode || !isDragging.current) return;
    toggleCell(dayIndex, slotIndex);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="mt-4 flex justify-center px-5">
      {/* 시간 라벨 */}
      <div className="mr-[6px] mt-[25px] flex flex-col gap-[48px]">
        {TIME_LABELS.map((label) => (
          <span
            key={label}
            className="body-g11-2 flex items-start justify-end text-tx-default_3"
          >
            {label}
          </span>
        ))}
      </div>

      {/* 요일 + 버튼 그리드 */}
      <div className="flex gap-[2px]">
        {DAYS.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center">
            <span className="body-g11 mb-[10px] text-tx-default_3">{day}</span>
            <div
              className="flex flex-col gap-[2px]"
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {TIME_SLOTS.map((_, slotIndex) => (
                <button
                  key={`${dayIndex}-${slotIndex}`}
                  type="button"
                  onPointerDown={() => handlePointerDown(dayIndex, slotIndex)}
                  onPointerEnter={() => handlePointerEnter(dayIndex, slotIndex)}
                  className={cn(
                    'h-[30px] w-[42px] touch-none rounded',
                    availability[dayIndex][slotIndex]
                      ? 'bg-bg-secondary_2'
                      : isEditMode
                        ? 'bg-tx-default_3'
                        : 'cursor-not-allowed bg-tx-default_5',
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
