import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatMonthDayLabel } from '@/entities/calendar/lib/recurrence';
import { formatDateString } from '@/entities/calendar/lib/recurrence';
import {
  getTeamRoomDetail,
  updateTeamRoom,
} from '@/entities/teamroom/api/teamroom-api';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
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

  const teamName = editData?.title ?? '';
  const description = editData?.description ?? '';
  const selectedImageId = editData?.bannerImageId ?? DEFAULT_TEAMROOM_IMAGE_ID;
  const deadlineDate = editData?.deadline
    ? new Date(editData.deadline)
    : undefined;
  const isDeadlineSelected = Boolean(deadlineDate);

  useEffect(() => {
    if (!id) return;
    if (editData) {
      setIsLoading(false);
      return;
    }

    const fetchTeamRoom = async () => {
      setIsLoading(true);
      try {
        const teamRoom = await getTeamRoomDetail(Number(id));
        if (!teamRoom) return;
        setEditData({
          title: teamRoom.title,
          description: teamRoom.description,
          deadline: teamRoom.deadline,
          bannerImageId: teamRoom.bannerImageId,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamRoom();
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
      onSelectDate: (date) => updateEditData({ deadline: date.toISOString() }),
    });
  };

  const isEditEnabled = teamName.trim().length > 0 && Boolean(deadlineDate);

  const handleEditTeamRoom = async () => {
    setIsSubmitted(true);
    if (!isEditEnabled) return;

    const deadlineDateTime = `${formatDateString(deadlineDate!)}T00:00:00`;

    try {
      await updateTeamRoom(Number(id), {
        title: teamName.trim(),
        description,
        bannerImageId: selectedImageId,
        deadline: deadlineDateTime,
      });

      setEditData({
        title: teamName.trim(),
        description,
        bannerImageId: selectedImageId,
        deadline: deadlineDate!.toISOString(),
      });

      navigate(`/teamroom/${id}`);
    } catch (error) {
      console.error(error);
    }
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
          onChange={(value) => updateEditData({ title: value })}
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
