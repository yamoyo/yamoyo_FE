import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoom } from '@/entities/teamroom/model/types';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import TeamRoomBanner from '@/widgets/teamroom/main/ui/TeamRoomBanner';
import MemberListSection from '@/widgets/teamroom/main/ui/MemberListSection';
import LeaderGameCard from '@/widgets/teamroom/main/ui/LeaderGameCard';
import AddMemberBottomSheet from '@/widgets/teamroom/main/ui/AddMemberBottomSheet';
import TeamRoomOptionsBottomSheet from '@/widgets/teamroom/main/ui/TeamRoomOptionsBottomSheet';

export default function TeamRoomMainPage() {
  const { id } = useParams<{ id: string }>();
  const [teamRoom, setTeamRoom] = useState<TeamRoom | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const clearEditData = useTeamRoomEditStore((state) => state.clearEditData);
  const appliedEditDataRef = useRef(false);

  useEffect(() => {
    if (!id) return;

    const editData = useTeamRoomEditStore.getState().editData;

    getTeamRoom(id).then((data) => {
      if (!data) return;

      // 수정된 데이터가 있으면 반영
      if (editData && !appliedEditDataRef.current) {
        setTeamRoom({
          ...data,
          name: editData.name,
          description: editData.description,
          bannerId: editData.bannerId,
          deadlineDate: editData.deadlineDate,
        });
        appliedEditDataRef.current = true;
        // 데이터 적용 후 전역 상태 초기화
        clearEditData();
      } else {
        setTeamRoom(data);
      }
    });
  }, [id, clearEditData]);

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
      <LeaderGameCard onStart={() => {}} />
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
