import { Member } from '../teamroom/model/types';

interface Props {
  members: Member[];
  name: string;
  imgId: number;
  dday?: string;
}

export default function HomeListItem({ members, name, imgId, dday }: Props) {
  const visibleMembers = members.slice(0, 6); // 멤버를 6명 단위로 자름

  return (
    <div className="flex select-none items-center gap-3 rounded-[12px] border border-[#4C5377] bg-[#3D4366] px-[15px] py-[13px]">
      {/* 팀 배너 이미지 */}
      <img
        src={`/assets/banner/banner-${imgId}.png`}
        alt={`${name} 배너`}
        className="h-[60px] w-[60px] shrink-0 select-none rounded-full object-cover"
        draggable="false"
      />
      <div className="flex flex-1 flex-col gap-[9px]">
        <span className="text-[14px] font-bold text-white">{name}</span>

        {/* Avatar stack 방식으로 멤버 프로필 이미지 겹침 UI 제작 */}
        <div className="flex items-center">
          <div className="flex items-center -space-x-2">
            {visibleMembers.map((member) => (
              <span
                key={member.id}
                className="h-6 w-6 rounded-full border border-[#3D4366] bg-[#2B2F45] flex-center"
              >
                <img
                  src={member.avatar}
                  alt="사용자 프로필 이미지"
                  className="h-[12px] w-[12px]"
                  draggable="false"
                />
              </span>
            ))}
          </div>
          {/** TODO(준열): 멤버가 6명을 초과하면 그 이상의 숫자를 나타내는 추가 기능입니다. */}
          {members.length > 6 && (
            <span className="ml-1 text-[11px] font-medium text-white/70">
              +{members.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* D-day */}
      {dday && <p className="text-[11px] font-medium text-[#A3A8C4]">{dday}</p>}
    </div>
  );
}
