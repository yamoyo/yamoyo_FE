import { Link } from 'react-router-dom';
import HomeListItem from '@/widgets/home/HomeListItem';
import HomeListEmptyItem from '@/widgets/home/HomeListEmptyItem';
import { MOCK_TEAM_ROOMS } from '@/shared/constants/mock-team-rooms';

export function HomeList() {
  return (
    <div className="flex flex-1 flex-col gap-[13px] rounded-t-[20px] bg-[#282D4D] px-[24px] pb-[30px] pt-[30px]">
      {/** 헤더 + 팀 단일 아이템 스타일 래퍼 */}
      <div className="flex select-none items-end justify-between">
        <span className="text-[16px] font-bold text-[#EEEFF8]">
          MY 팀룸 목록
        </span>
        <Link
          to="/"
          className="text-[12px] font-bold text-[#AA89FF]"
          draggable="false"
        >
          전체보기
        </Link>
      </div>
      {MOCK_TEAM_ROOMS.map((team) => (
        <HomeListItem
          key={team.id}
          teamName={team.name}
          members={team.members}
          dday={team.dday}
          bannerImage={team.image}
        />
      ))}
      <HomeListEmptyItem />
    </div>
  );
}

export default HomeList;
