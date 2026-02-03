import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoomDetail } from '@/entities/teamroom/api/teamroom-dto';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import TeamRoomContents from '@/widgets/teamroom/main/dashboard/TeamRoomContents';
import AddMemberBottomSheet from '@/widgets/teamroom/main/ui/AddMemberBottomSheet';
import MemberListSection from '@/widgets/teamroom/main/ui/MemberListSection';
import TeamRoomBanner from '@/widgets/teamroom/main/ui/TeamRoomBanner';
import TeamRoomOptionsBottomSheet from '@/widgets/teamroom/main/ui/TeamRoomOptionsBottomSheet';

export default function TeamRoomMainPage() {
  const { id } = useParams<{ id: string }>();
  const [teamRoom, setTeamRoom] = useState<TeamRoomDetail | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const editData = useTeamRoomEditStore((state) => state.editData);
  const clearEditData = useTeamRoomEditStore((state) => state.clearEditData);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    getTeamRoomDetail(Number(id)).then((data) => {
      if (isMounted && data) {
        setTeamRoom(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (editData) {
      setTeamRoom((prev) =>
        prev
          ? {
              ...prev,
              title: editData.title,
              description: editData.description,
              bannerImageId: editData.bannerImageId,
              deadline: editData.deadline,
            }
          : null,
      );
      clearEditData();
    }
  }, [editData, clearEditData]);

  return (
    <>
      <TeamRoomBanner
        teamRoom={teamRoom}
        onSettingsClick={() => setIsOptionsOpen(true)}
      />
      <MemberListSection
        members={teamRoom?.members ?? []}
        onAddMember={() => setIsAddMemberOpen(true)}
      />
      <TeamRoomContents />
      <AddMemberBottomSheet
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />
      <TeamRoomOptionsBottomSheet
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        teamRoom={teamRoom}
      />
    </>
  );
}
