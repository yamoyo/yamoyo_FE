interface Member {
  id: number;
  avatar: string;
}

interface HomeListItemProps {
  teamName: string;
  members: Member[];
  dday: string;
}

const HomeListItem = ({ teamName, members, dday }: HomeListItemProps) => {
  const visibleMembers = members.slice(0, 9);

  return (
    <div className="flex flex-col gap-[9px] rounded-[12px] border border-[#4C5377] bg-[#3D4366] px-[15px] py-[13px]">
      <span className="text-[14px] font-bold text-white">{teamName}</span>

      <div className="flex items-center justify-between">
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
                />
              </span>
            ))}
          </div>
          {/** TODO(준열): 멤버가 9명을 초과하면 그 이상의 숫자를 나타내는 추가 기능입니다. 확정 X */}
          {members.length > 9 && (
            <span className="ml-1 text-[11px] font-medium text-white/70">
              +{members.length - 9}
            </span>
          )}
        </div>

        {/* D-day */}
        <p className="text-[11px] font-medium text-white">{dday}</p>
      </div>
    </div>
  );
};

export default HomeListItem;
