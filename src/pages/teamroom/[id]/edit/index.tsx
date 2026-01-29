import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import { formatMonthDayLabel } from '@/entities/calendar/lib/recurrence';
import {
  DEFAULT_TEAMROOM_IMAGE_ID,
  TEAMROOM_IMAGES,
} from '@/shared/constants/teamroom-images';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import {
  BannerSection,
  DeadlineField,
  DescriptionField,
  TeamNameField,
} from '@/widgets/teamroom/create';

export default function TeamRoomEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(
    () => !useTeamRoomEditStore.getState().editData,
  );

  const editData = useTeamRoomEditStore((state) => state.editData);
  const setEditData = useTeamRoomEditStore((state) => state.setEditData);
  const updateEditData = useTeamRoomEditStore((state) => state.updateEditData);

  const teamName = editData?.name ?? '';
  const description = editData?.description ?? '';
  const selectedImageId = editData?.bannerId ?? DEFAULT_TEAMROOM_IMAGE_ID;
  const deadlineDate = editData?.deadlineDate
    ? new Date(editData.deadlineDate)
    : undefined;
  const isDeadlineSelected = Boolean(deadlineDate);

  // 기존 팀룸 데이터 불러오기 (최초 1회만)
  useEffect(() => {
    if (!id) return;
    if (editData) {
      setIsLoading(false);
      return;
    }

    getTeamRoom(id).then((teamRoom) => {
      if (!teamRoom) return;
      setEditData({
        name: teamRoom.name,
        description: teamRoom.description,
        deadlineDate: teamRoom.deadlineDate,
        bannerId: teamRoom.bannerId,
      });
      setIsLoading(false);
    });
  }, [id, editData, setEditData]);

  const previewImage =
    TEAMROOM_IMAGES.find((image) => image.id === selectedImageId)?.src ?? '';

  const isDefaultImage = selectedImageId === DEFAULT_TEAMROOM_IMAGE_ID;

  const openCalendarModal = useModalStore((state) => state.openCalendarModal);

  const deadlineLabel = deadlineDate
    ? formatMonthDayLabel(deadlineDate)
    : '날짜를 선택해주세요';

  const handleOpenDeadlineCalendar = () => {
    openCalendarModal({
      selectedDate: deadlineDate,
      onSelectDate: (date) =>
        updateEditData({ deadlineDate: date.toISOString() }),
    });
  };

  const isEditEnabled = teamName.trim().length > 0 && Boolean(deadlineDate);

  const handleEditTeamRoom = async () => {
    setIsSubmitted(true);
    if (!isEditEnabled) {
      return;
    }

    // TODO: 팀룸 수정 API 호출
    // await updateTeamRoom(id, {
    //   name: teamName.trim(),
    //   description,
    //   bannerId: selectedImageId,
    //   deadlineDate: deadlineDate!.toISOString(),
    // });

    // 전역 상태에 최종 데이터 저장
    setEditData({
      name: teamName.trim(),
      description,
      bannerId: selectedImageId,
      deadlineDate: deadlineDate!.toISOString(),
    });

    navigate(`/teamroom/${id}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <TopBar
        title={'팀룸 설정'}
        backIcon="arrow"
        onBack={() => navigate(`/teamroom/${id}`)}
      />

      <BannerSection
        imageSrc={previewImage}
        isDefaultImage={isDefaultImage}
        onEdit={() => navigate(`/teamroom/${id}/edit/banner`)}
      />

      <section className="flex flex-col gap-9 px-6 pt-9">
        <TeamNameField
          value={teamName}
          onChange={(value) => updateEditData({ name: value })}
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
          onChange={(value) => updateEditData({ description: value })}
        />
      </section>

      <div className="px-6 pb-[16px] pt-[43px]">
        <BottomButton
          text={'수정하기'}
          onClick={handleEditTeamRoom}
          disabled={!isEditEnabled}
        />
      </div>
    </div>
  );
}
