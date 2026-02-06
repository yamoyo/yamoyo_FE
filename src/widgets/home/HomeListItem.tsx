import { Link } from 'react-router-dom';

import type { TeamRoomListItem } from '@/entities/teamroom/api/teamroom-dto';
import { calculateDday } from '@/entities/teamroom/lib/calculate-dday';

interface Props {
  teamRoom: TeamRoomListItem;
}

export default function HomeListItem({ teamRoom }: Props) {
  const { teamRoomId, title, bannerImageId, members, deadline } = teamRoom;
  const visibleMembers = members.slice(0, 6);
  const dday = calculateDday(deadline);

  return (
    <Link
      to={`/teamroom/${teamRoomId}`}
      className="flex select-none items-center gap-3 rounded-[12px] border border-[#4C5377] bg-[#3D4366] px-[15px] py-[13px]"
      draggable="false"
    >
      {/* 팀 배너 이미지 */}
      <img
        src={`/assets/banner/banner-${bannerImageId}.png`}
        alt={`${title} 배너`}
        className="h-[60px] w-[60px] shrink-0 select-none rounded-full object-cover"
        draggable="false"
      />
      <div className="flex flex-1 flex-col gap-[9px]">
        <span className="text-[14px] font-bold text-white">{title}</span>

        {/* Avatar stack 방식으로 멤버 프로필 이미지 겹침 UI 제작 */}
        <div className="flex items-center">
          <div className="flex items-center -space-x-2">
            {visibleMembers.map((member) => (
              <span
                key={member.userId}
                className="h-6 w-6 rounded-full border border-[#3D4366] bg-[#2B2F45] flex-center"
              >
                <img
                  src={`/assets/character/char-${member.profileImageId}.png`}
                  alt="사용자 프로필 이미지"
                  className="h-[12px] w-[12px]"
                  draggable="false"
                />
              </span>
            ))}
          </div>
          {members.length > 6 && (
            <span className="ml-1 text-[11px] font-medium text-white/70">
              +{members.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* D-day */}
      {dday && <p className="text-[11px] font-medium text-[#A3A8C4]">{dday}</p>}
    </Link>
  );
}
