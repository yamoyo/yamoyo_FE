import { useRef, useEffect } from 'react';
import { cn } from '@/shared/config/tailwind/cn';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
const TIME_SLOT_COUNT = 32; // 각 요일별 셀 갯수
const SCROLL_THRESHOLD = 80; // 화면 가장자리 위 아래 해당 값일 때 자동 스크롤 위치
const SCROLL_SPEED = 8; // 스크롤 속도

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
  const lastCell = useRef<string | null>(null);
  const scrollInterval = useRef<number | null>(null);
  const pointerY = useRef<number>(0);

  const toggleCell = (dayIndex: number, slotIndex: number) => {
    const newAvailability = availability.map((day) => [...day]);
    newAvailability[dayIndex][slotIndex] = dragValue.current;
    onAvailabilityChange(newAvailability);
  };

  // 사용자가 터치시 현재 셀의 위치를 찾는 함수
  const getCellFromPoint = (
    clientX: number,
    clientY: number,
  ): { day: number; slot: number } | null => {
    const element = document.elementFromPoint(clientX, clientY);
    if (!element) return null;

    const button = element.closest('button[data-cell]');
    if (!button) return null;

    const cellData = button.getAttribute('data-cell');
    if (!cellData) return null;

    const [day, slot] = cellData.split('-').map(Number);
    return { day, slot };
  };

  const startAutoScroll = () => {
    // 화면 하단 가장자리에 닿으면 자동으로 스크롤
    if (scrollInterval.current) return;

    scrollInterval.current = window.setInterval(() => {
      const y = pointerY.current;

      if (y < SCROLL_THRESHOLD) {
        window.scrollBy(0, -SCROLL_SPEED);
      } else if (y > window.innerHeight - SCROLL_THRESHOLD) {
        window.scrollBy(0, SCROLL_SPEED);
      }
    }, 16);
  };

  const stopAutoScroll = () => {
    // 드래그를 멈추면 스크롤도 같이 멈추게 동작
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  // 사용자가 셀을 누르는 순간 시작하는 이벤트 핸들러
  // 1. 드래그 상태를 변경
  // 2. 토글할 값을 결정
  // 3. 누른 셀을 토글
  // 4. 자동 스크롤 인터벌을 시작

  const handlePointerDown = (dayIndex: number, slotIndex: number) => {
    if (!isEditMode) return;
    isDragging.current = true;
    dragValue.current = !availability[dayIndex][slotIndex];
    lastCell.current = `${dayIndex}-${slotIndex}`;
    toggleCell(dayIndex, slotIndex);
    startAutoScroll();
  };

  // 사용자가 셀을 누르면서 움직이는 동안 이벤트 핸들러
  // 1. 현재 y 좌표를 저장
  // 2. 이동한 셀을 토글
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isEditMode || !isDragging.current) return;

    pointerY.current = e.clientY;

    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (!cell) return;

    const cellKey = `${cell.day}-${cell.slot}`;
    if (lastCell.current === cellKey) return;

    lastCell.current = cellKey;
    toggleCell(cell.day, cell.slot);
  };

  // 사용자가 셀을 누르지 않는 순간 이벤트 핸들러
  // 1. 드래그를 종료 상태로 변경
  // 2. 자동 스크롤 인터벌 상태를 삭제

  const handlePointerUp = () => {
    isDragging.current = false;
    lastCell.current = null;
    stopAutoScroll();
  };

  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

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
      <div
        className="flex gap-[2px]"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {DAYS.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center">
            <span className="body-g11 mb-[10px] text-tx-default_3">{day}</span>
            <div className="flex flex-col gap-[2px]">
              {Array.from({ length: TIME_SLOT_COUNT }, (_, slotIndex) => (
                <button
                  key={`${dayIndex}-${slotIndex}`}
                  type="button"
                  data-cell={`${dayIndex}-${slotIndex}`}
                  onPointerDown={() => handlePointerDown(dayIndex, slotIndex)}
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
