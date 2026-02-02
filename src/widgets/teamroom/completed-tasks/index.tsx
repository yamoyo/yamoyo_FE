import TopBar from '@/shared/ui/header/TopBar';
import HomeListItem from '@/widgets/home/HomeListItem';

import { MOCK_COMPLETED_TEAM_ROOMS } from '../model/constants';

export function CompletedTasks() {
  return (
    <>
      <TopBar title="완료 팀플 목록" />
      <div className="mt-4 flex flex-col gap-5 px-6">
        {MOCK_COMPLETED_TEAM_ROOMS.map((team) => (
          <HomeListItem key={team.id} {...team} />
        ))}
      </div>
    </>
  );
}
