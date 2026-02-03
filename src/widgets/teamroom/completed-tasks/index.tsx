import type { TeamRoomListItem } from '@/entities/teamroom/api/teamroom-dto';
import TopBar from '@/shared/ui/header/TopBar';
import HomeListItem from '@/widgets/home/HomeListItem';

import { MOCK_COMPLETED_TEAM_ROOMS } from '../model/constants';

const toTeamRoomListItem = (
  team: (typeof MOCK_COMPLETED_TEAM_ROOMS)[number],
): TeamRoomListItem => ({
  teamRoomId: team.id,
  title: team.name,
  bannerImageId: team.imgId,
  createdAt: team.createdAt,
  deadline: team.createdAt,
  status: 'ARCHIVED',
  memberCount: team.members.length,
  members: team.members.map((member) => ({
    userId: member.id,
    profileImageId: member.id,
  })),
});

export function CompletedTasks() {
  return (
    <>
      <TopBar title="완료 팀플 목록" />
      <div className="mt-4 flex flex-col gap-5 px-6">
        {MOCK_COMPLETED_TEAM_ROOMS.map((team) => (
          <HomeListItem key={team.id} teamRoom={toTeamRoomListItem(team)} />
        ))}
      </div>
    </>
  );
}
