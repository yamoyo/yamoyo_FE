import { useRef, useState } from 'react';

import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import { cn } from '@/shared/config/tailwind/cn';

const DAYS = ['일', '월', '화', '수', '금', '토', '일'] as const;

const TIME_SLOTS = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

const TIME_LABELS = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 8;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const createInitialAvailability = () =>
  Array.from({ length: 7 }, () => Array.from({ length: 32 }, () => false));

export default function TimePickPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [availability, setAvailability] = useState<boolean[][]>(
    createInitialAvailability,
  );

  const isDragging = useRef(false);
  const dragValue = useRef<boolean>(true);

  const toggleCell = (dayIndex: number, slotIndex: number) => {
    setAvailability((prev) => {
      const newAvailability = prev.map((day) => [...day]);
      newAvailability[dayIndex][slotIndex] = dragValue.current;
      return newAvailability;
    });
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

  const handleReset = () => {
    setAvailability(createInitialAvailability());
  };

  const handleSubmit = () => {
    // TODO: teamRoomId를 useParams로 받아와서 API 호출
    // const body = { availability };
    // await authClient.post(`/api/team-rooms/${teamRoomId}/timepick/availability`, body);
  };

  const hasSelection = availability.some((day) => day.some((slot) => slot));

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/timepick/timepick-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TopBar
        title="시간 설정"
        backIcon="arrow"
        rightContent={
          <button type="button" className="h-[22px] w-[50px] flex-center">
            <img
              src="/assets/icons/badge-guide.svg"
              width={50}
              height={22}
              className="select-none"
              draggable="false"
            />
          </button>
        }
      />

      <div className="mt-5 flex flex-col items-start gap-[30px] px-5">
        <p className="w-[264px] text-title-2 text-tx-default">
          팀원들이 가장
          <span className="text-bg-secondary_2"> 많이 겹치는 시간</span>
          <br />을 찾고 있어요
        </p>
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <BottomButton
                text={isEditMode ? '설정 완료' : '시간 설정'}
                onClick={() => setIsEditMode((prev) => !prev)}
                className={cn(
                  'h-[40px] w-[88px] rounded-lg text-body-4',
                  isEditMode
                    ? 'bg-tx-default_3 text-bg-default'
                    : 'bg-bg-primary text-tx-default',
                )}
              />
              <button
                type="button"
                onClick={handleReset}
                className="size-[40px] gap-[10px] rounded-[5.714px] bg-bd-textfiled_line flex-center"
              >
                <img
                  src="/assets/icons/timepick-reset.svg"
                  alt="reset"
                  width={28}
                  height={28}
                />
              </button>
            </div>

            <button
              type="button"
              className="h-[40px] w-[110px] gap-1 rounded-lg bg-bd-textfiled_line flex-center"
            >
              <img
                src="/assets/icons/everytime.svg"
                alt="에브리타임"
                className="size-5"
              />
              <span className="text-body-4 text-tx-default">불러오기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 시간표 그리드 */}
      <div className="mt-4 flex justify-center px-5">
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
              <span className="body-g11 mb-[10px] text-tx-default_3">
                {day}
              </span>
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
                    onPointerEnter={() =>
                      handlePointerEnter(dayIndex, slotIndex)
                    }
                    className={cn(
                      'h-[30px] w-[42px] touch-none rounded',
                      availability[dayIndex][slotIndex]
                        ? 'bg-bg-secondary_2'
                        : isEditMode
                          ? 'bg-tx-default_3'
                          : 'bg-tx-default_5',
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[48px] mt-[80px] px-5">
        <BottomButton
          text="선호 시간대 설정"
          onClick={handleSubmit}
          disabled={!hasSelection}
          className="h-auto gap-[10px] self-stretch px-[80px] py-4 flex-center"
        />
      </div>
    </div>
  );
}
