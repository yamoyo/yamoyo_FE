import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoom } from '@/entities/teamroom/model/types';
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

  useEffect(() => {
    if (!id) return;
    getTeamRoom(id).then(setTeamRoom);
  }, [id]);

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
