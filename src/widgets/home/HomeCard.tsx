/**
 * 홈 뷰 페이지 팀룸 생성 카드 컴포넌트
 * @author junyeol
 */
import { Link } from 'react-router-dom';

export function HomeCard() {
  return (
    <div className="mx-[24px] mb-[45px] mt-[20px] flex w-[341px] flex-col gap-[10px]">
      <div className="relative flex w-full items-start">
        <div className="flex select-none flex-col gap-[16px]">
          <div className="text-[20px] font-bold leading-tight text-white">
            <p>팀 프로젝트 초기 세팅,</p>
            <p>쉽고 빠르게!</p>
          </div>

          <div className="text-[13px] font-medium leading-relaxed text-[#D5D6E1]">
            <p>야모요와 함께</p>
            <p>지금 바로 시작해보세요.</p>
          </div>
        </div>

        <img
          src="/assets/home/home-crown.png"
          alt=""
          className="absolute right-0 h-[160px] w-[170px] select-none"
          draggable="false"
        />
      </div>

      <Link
        to="/teamroom/create"
        className="mt-[40px] h-[55px] w-[160px] select-none gap-[14px] rounded-xl bg-bg-primary text-body-1 text-white transition-colors flex-center hover:bg-[#6B3FE6]"
        draggable="false"
      >
        <img
          src="/assets/home/users.png"
          width={30}
          height={30}
          draggable="false"
          alt=""
        />
        팀룸 생성하기
      </Link>
    </div>
  );
}

export default HomeCard;
