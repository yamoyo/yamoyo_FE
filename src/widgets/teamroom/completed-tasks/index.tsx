import { useTeamRoomList } from '@/entities/teamroom/hooks/useTeamRoom';
import TopBar from '@/shared/ui/header/TopBar';
import HomeListItem from '@/widgets/home/HomeListItem';

export function CompletedTasks() {
  const { data: teamRooms, isLoading } = useTeamRoomList('ARCHIVED');

  return (
    <>
      <TopBar title="완료 팀플 목록" />
      <div className="mt-4 flex flex-col gap-5 px-6">
        {isLoading ? (
          <div className="py-4 text-center text-body-2 text-tx-default_5">
            로딩 중...
          </div>
        ) : teamRooms && teamRooms.length > 0 ? (
          teamRooms.map((teamRoom) => (
            <HomeListItem key={teamRoom.teamRoomId} teamRoom={teamRoom} />
          ))
        ) : (
          <div className="py-4 text-center text-body-2 text-tx-default_5">
            완료된 팀플이 없습니다
          </div>
        )}
      </div>
    </>
  );
}
