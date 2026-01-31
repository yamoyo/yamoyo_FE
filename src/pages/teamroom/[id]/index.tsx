import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoom } from '@/entities/teamroom/model/types';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import TeamRoomBanner from '@/widgets/teamroom/main/ui/TeamRoomBanner';
import MemberListSection from '@/widgets/teamroom/main/ui/MemberListSection';
import AddMemberBottomSheet from '@/widgets/teamroom/main/ui/AddMemberBottomSheet';
import TeamRoomOptionsBottomSheet from '@/widgets/teamroom/main/ui/TeamRoomOptionsBottomSheet';
import TeamRoomContents from '@/widgets/teamroom/main/dashboard/TeamRoomContents';

export default function TeamRoomMainPage() {
  const { id } = useParams<{ id: string }>();
  const [teamRoom, setTeamRoom] = useState<TeamRoom | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const editData = useTeamRoomEditStore((state) => state.editData);
  const clearEditData = useTeamRoomEditStore((state) => state.clearEditData);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    getTeamRoom(id).then((data) => {
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
      setTeamRoom((prev) => (prev ? { ...prev, ...editData } : null));
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
