import { Link } from 'react-router-dom';

import HomeListEmptyItem from '@/widgets/home/HomeListEmptyItem';
import HomeListItem from '@/widgets/home/HomeListItem';

import { MOCK_TEAM_ROOMS } from '../teamroom/model/constants';

export default function HomeList() {
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
      {MOCK_TEAM_ROOMS.map((team) => (
        <HomeListItem key={team.id} {...team} />
      ))}
      <HomeListEmptyItem />
    </div>
  );
}
