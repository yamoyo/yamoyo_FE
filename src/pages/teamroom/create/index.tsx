import { useState } from 'react';
import { cn } from '@/shared/config/tailwind/cn';
import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import TextField from '@/shared/ui/input/TextField';
import { formatMonthDayLabel } from '@/entities/calendar/lib/recurrence';
import {
  DEFAULT_TEAMROOM_IMAGE_ID,
  TEAMROOM_IMAGES,
} from '@/shared/constants/teamroom-images';
import { useModalStore } from '@/shared/ui/modal/model/choice-modal-store';

export default function TeamRoomCreatePage() {
  const [teamName, setTeamName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [description, setDescription] = useState('');

  const isDeadlineSelected = Boolean(deadlineDate);
  const selectedImageId = DEFAULT_TEAMROOM_IMAGE_ID;

  const previewImage =
    TEAMROOM_IMAGES.find((image) => image.id === selectedImageId)?.src ?? '';

  const isDefaultImage = selectedImageId === DEFAULT_TEAMROOM_IMAGE_ID;

  const openCalendarModal = useModalStore((state) => state.openCalendarModal);

  const deadlineLabel = deadlineDate
    ? formatMonthDayLabel(deadlineDate)
    : '날짜를 선택해주세요'; // 날짜 선택 여부에 따른 표출 텍스트 판단

  const handleOpenDeadlineCalendar = () => {
    openCalendarModal({
      selectedDate: deadlineDate,
      onSelectDate: setDeadlineDate,
    });
  };

  const isCreateEnabled = teamName.trim().length > 0 && Boolean(deadlineDate); // 만들기 버튼 활성화 여부 판단

  return (
    <div className="flex flex-col">
      <header>
        <TopBar title={'팀룸 설정'} backIcon="arrow" />
      </header>

      <section className="w-full pt-2">
        <div className="relative h-[200px] w-full select-none flex-center">
          <img
            src={previewImage}
            alt="팀룸 배너 미리보기"
            className="h-full w-full object-cover"
            draggable="false"
          />
          <button
            type="button"
            onClick={() => {}}
            className="absolute bottom-4 right-6"
            aria-label="이미지 변경"
          >
            <img
              src={`/assets/icons/${isDefaultImage ? 'image-none-select' : 'image-selected'}.svg`}
              alt={isDefaultImage ? '이미지 없음' : '이미지 선택됨'}
              className="size-[40px]"
              draggable="false"
            />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-9 px-6 pt-9">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 text-body-4.1">
            <span className="text-tx-default_3">팀 이름</span>
            <span className="text-bg-secondary_2">*</span>
          </div>
          <div className="relative">
            <TextField
              value={teamName}
              onChange={setTeamName}
              placeholder="예시 : 스위프 웹 12기"
              maxLength={20}
              errorMessage={
                isSubmitted && teamName.length === 0
                  ? '팀 이름을 입력해주세요'
                  : undefined
              }
            />
            <span className="absolute bottom-[14px] right-[16px] text-caption-1 text-tx-default_4">
              {teamName.length}/20
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1 text-body-4.1">
            <span className="text-tx-default_3">마감일</span>
            <span className="text-bg-secondary_2">*</span>
          </div>
          <button
            type="button"
            onClick={handleOpenDeadlineCalendar}
            className="flex h-12 w-full items-center justify-between rounded-xl border border-bd-default bg-bg-textfiled px-[15px] text-left text-body-4.1 text-tx-default"
          >
            <span
              className={cn(
                'text-body-4.1',
                isDeadlineSelected
                  ? 'text-tx-default'
                  : 'text-tx-textfiled_disabled',
              )}
            >
              {deadlineLabel}
            </span>
            <img
              src="/assets/icons/calendar.svg"
              alt=""
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-body-4.1 text-tx-default_3">
            한 줄 소개를 해주세요.
          </span>
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="팀에 대해서 간단히 소개해주세요."
              maxLength={50}
              className="h-[90px] w-full resize-none rounded-xl border border-bd-default bg-bg-textfiled px-[15px] py-3 pr-16 text-body-4.1 text-tx-default outline-none transition placeholder:text-tx-textfiled_disabled focus:border-textfiled-line_focus"
            />
            <span className="absolute bottom-[16px] right-[16px] text-caption-1 text-tx-default_4">
              {description.length}/50
            </span>
          </div>
        </div>
      </section>

      <div className="px-6 pb-[16px] pt-[43px]">
        <BottomButton
          text={'만들기'}
          onClick={() => {
            setIsSubmitted(true);
          }}
          disabled={!isCreateEnabled}
        />
      </div>
    </div>
  );
}
