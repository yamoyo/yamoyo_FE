import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import { formatMonthDayLabel } from '@/entities/calendar/lib/recurrence';
import {
  DEFAULT_TEAMROOM_IMAGE_ID,
  TEAMROOM_IMAGES,
} from '@/shared/constants/teamroom-images';
import { useModalStore } from '@/shared/ui/modal/model/choice-modal-store';
import {
  BannerSection,
  DeadlineField,
  DescriptionField,
  TeamNameField,
} from '@/widgets/teamroom/create';

export default function TeamRoomCreatePage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [description, setDescription] = useState('');

  const isDeadlineSelected = Boolean(deadlineDate);

  const location = useLocation();
  const bannerId = (location.state as { bannerId?: string })?.bannerId;
  const selectedImageId = bannerId ?? DEFAULT_TEAMROOM_IMAGE_ID;

  const previewImage =
    TEAMROOM_IMAGES.find((image) => image.id === selectedImageId)?.src ?? ''; // 해당 ID 값에 맞는 이미지 경로로 설정

  const isDefaultImage = selectedImageId === DEFAULT_TEAMROOM_IMAGE_ID; // 이미지 종류 판단하여 이미지 선택 아이콘 변경

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
      <TopBar
        title={'팀룸 설정'}
        backIcon="arrow"
        onBack={() => navigate('/home')}
      />

      <BannerSection
        imageSrc={previewImage}
        isDefaultImage={isDefaultImage}
        onEdit={() => navigate('/teamroom/create/banner')}
      />

      <section className="flex flex-col gap-9 px-6 pt-9">
        <TeamNameField
          value={teamName}
          onChange={setTeamName}
          errorMessage={
            isSubmitted && teamName.trim().length === 0
              ? '팀 이름을 입력해주세요'
              : undefined
          }
        />

        <DeadlineField
          displayLabel={deadlineLabel}
          isSelected={isDeadlineSelected}
          onOpen={handleOpenDeadlineCalendar}
        />

        <DescriptionField value={description} onChange={setDescription} />
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
