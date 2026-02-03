import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  formatDateString,
  formatMonthDayLabel,
} from '@/entities/calendar/lib/recurrence';
import { useCreateTeamRoom } from '@/entities/teamroom/hooks/useTeamRoom';
import { useTeamRoomCreateStore } from '@/entities/teamroom/model/teamroom-create-store';
import {
  DEFAULT_TEAMROOM_IMAGE_ID,
  TEAMROOM_IMAGES,
} from '@/shared/constants/teamroom-images';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import {
  BannerSection,
  DeadlineField,
  DescriptionField,
  TeamNameField,
} from '@/widgets/teamroom/create';

export default function TeamRoomCreatePage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync: createTeamRoom } = useCreateTeamRoom();

  const createData = useTeamRoomCreateStore((state) => state.createData);

  const setCreateData = useTeamRoomCreateStore((state) => state.setCreateData);

  const updateCreateData = useTeamRoomCreateStore(
    (state) => state.updateCreateData,
  );

  const clearCreateData = useTeamRoomCreateStore(
    (state) => state.clearCreateData,
  );

  useEffect(() => {
    if (createData) return;
    setCreateData({
      title: '',
      description: '',
      bannerImageId: DEFAULT_TEAMROOM_IMAGE_ID,
      deadline: '',
    });
  }, [createData, setCreateData]);

  const teamName = createData?.title ?? '';
  const description = createData?.description ?? '';
  const selectedImageId =
    createData?.bannerImageId ?? DEFAULT_TEAMROOM_IMAGE_ID;
  const deadlineDate = createData?.deadline
    ? new Date(createData.deadline)
    : undefined;
  const isDeadlineSelected = Boolean(deadlineDate);

  const previewImage =
    TEAMROOM_IMAGES.find((image) => image.id === selectedImageId)?.src ?? ''; // 해당 ID 값에 맞는 이미지 경로로 설정

  const isDefaultImage = selectedImageId === DEFAULT_TEAMROOM_IMAGE_ID; // 이미지 종류 판단하여 이미지 선택 아이콘 변경

  const openCalendarModal = useModalStore((state) => state.openCalendarModal);

  const openTeamRoomCreatedModal = useModalStore(
    (state) => state.openTeamRoomCreatedModal,
  );

  const deadlineLabel = deadlineDate
    ? formatMonthDayLabel(deadlineDate)
    : '날짜를 선택해주세요'; // 날짜 선택 여부에 따른 표출 텍스트 판단

  const handleOpenDeadlineCalendar = () => {
    openCalendarModal({
      selectedDate: deadlineDate,
      onSelectDate: (date) =>
        updateCreateData({ deadline: date.toISOString() }),
    });
  };

  const isCreateEnabled = teamName.trim().length > 0 && Boolean(deadlineDate); // 만들기 버튼 활성화 여부 판단

  const handleCreateTeamRoom = async () => {
    setIsSubmitted(true);
    if (!isCreateEnabled) {
      return;
    }

    const deadlineDateTime = `${formatDateString(deadlineDate!)}T00:00:00`;

    const res = await createTeamRoom({
      title: teamName.trim(),
      description,
      bannerImageId: selectedImageId,
      deadline: deadlineDateTime,
    });
    const inviteLink = `${window.location.origin}/invite/${res.inviteToken}`;
    openTeamRoomCreatedModal({
      teamRoomId: res.teamRoomId,
      inviteLink,
    });
    clearCreateData();
  };

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
          onChange={(value) => updateCreateData({ title: value })}
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

        <DescriptionField
          value={description}
          onChange={(value) => updateCreateData({ description: value })}
        />
      </section>

      <div className="px-6 pb-[16px] pt-[43px]">
        <BottomButton
          text={'만들기'}
          onClick={handleCreateTeamRoom}
          disabled={!isCreateEnabled}
        />
      </div>
    </div>
  );
}
