/**
 * 팀룸이 없을 때 보여줄 빈 상태 아이템 컴포넌트
 * @author junyeol
 *
 */

// TODO(준열) : 추후에 서버 로직 적용하면 상태관리로 표시 여부 결정
const HomeListEmptyItem = () => {
  return (
    <div className="flex items-center gap-3 rounded-[12px] border border-[#4C5377] bg-[#3D4366] px-[15px] py-[13px]">
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#2F3453]">
        <img
          src="/assets/home/home-empty.png"
          alt=""
          className="h-[40px] w-[28px]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-[5px]">
        <span className="text-[14px] font-bold text-white">
          내가 속해있는 팀룸이 없어요
        </span>
        <p className="text-[12px] font-normal text-white/70">
          팀룸에 입장하여 프로젝트를 진행하세요
        </p>
      </div>
    </div>
  );
};

export default HomeListEmptyItem;
