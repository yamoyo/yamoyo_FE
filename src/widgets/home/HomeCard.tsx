/**
 * 홈 뷰 페이지 팀룸 생성 카드 컴포넌트
 * @author junyeol
 */
import { Link } from 'react-router-dom';

export function HomeCard() {
  return (
    <div className="relative mx-[24px] mb-[112px] mt-6">
      <img
        src="/assets/home/home-new-banner.png"
        alt=""
        className="pointer-events-none absolute right-[-20px] top-5 z-20 h-[214px] w-[150px] select-none"
        draggable="false"
      />
      <div className="relative z-10 flex w-[341px] flex-col gap-[10px]">
        <div className="flex select-none flex-col gap-2">
          <div className="text-title-1 text-tx-default">
            <p>팀 시작의 모든 결정,</p>
            <p>여기서 한 번에!</p>
          </div>

          <div className="text-body-5 text-tx-default_4">
            <p>야모요와 시작해볼까요?</p>
          </div>
        </div>

        <Link
          to="/teamroom/create"
          className="mt-[40px] h-[55px] w-[160px] select-none gap-[14px] rounded-xl bg-bg-primary text-body-1 text-tx-default transition-colors flex-center hover:bg-[#6B3FE6]"
          draggable="false"
        >
          팀룸 생성하기
        </Link>
      </div>
    </div>
  );
}

export default HomeCard;
