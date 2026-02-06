import { Link } from 'react-router-dom';

import { useTeamRoomList } from '@/entities/teamroom/hooks/useTeamRoom';
import HomeListEmptyItem from '@/widgets/home/HomeListEmptyItem';
import HomeListItem from '@/widgets/home/HomeListItem';
import { sortTeams } from '@/widgets/teamroom/utils/sortTeams';

export default function HomeList() {
  const { data: teamRooms, isLoading } = useTeamRoomList('ACTIVE');

  return (
    <div className="flex flex-1 flex-col gap-[13px] rounded-t-[20px] bg-[#282D4D] px-[24px] pb-[30px] pt-[30px]">
      {/** 헤더 + 팀 단일 아이템 스타일 래퍼 */}
      <div className="flex select-none items-end justify-between">
        <span className="text-[16px] font-bold text-[#EEEFF8]">
          MY 팀룸 목록
        </span>
        <Link
          to="/teamroom"
          className="text-[12px] font-bold text-[#AA89FF]"
          draggable="false"
        >
          전체보기
        </Link>
      </div>
      {isLoading ? (
        <div className="py-4 text-center text-white/50">로딩 중...</div>
      ) : teamRooms && teamRooms.length > 0 ? (
        sortTeams(teamRooms, 'latest')
          .slice(0, 3)
          .map((teamRoom) => (
            <HomeListItem key={teamRoom.teamRoomId} teamRoom={teamRoom} />
          ))
      ) : (
        <HomeListEmptyItem />
      )}
    </div>
  );
}
