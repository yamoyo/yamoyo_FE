import { Link } from 'react-router-dom';

/**
 * 홈뷰 페이지 헤더 컴포넌트
 * @author junyeol
 */

export default function HomeHeader() {
  return (
    <header className="flex items-center justify-between px-[24px] text-white">
      <Link to="/" draggable="false">
        <img
          src="/assets/home/home-logo.png"
          width={72}
          height={36}
          alt="logo"
          className="select-none"
          draggable="false"
        />
      </Link>
      <div className="flex items-center gap-[17px]">
        {/** TODO (준열) : 추후 캘린더 페이지 제작시 연결 */}
        <Link to="/calendar" draggable="false">
          <img
            src="/assets/home/home-cal.png"
            width={24}
            height={24}
            alt="달력"
            className="select-none"
            draggable="false"
          />
        </Link>

        <Link to="/notification" draggable="false">
          <img
            src="/assets/home/home-bell.png"
            width={24}
            height={24}
            alt="알림"
            className="select-none"
            draggable="false"
          />
        </Link>

        <Link
          to="/mypage"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[11px] bg-[#3D4366]"
          draggable="false"
        >
          <img
            src="/assets/home/home-example-profile.png"
            width={18}
            height={18}
            alt="마이프로필"
            className="select-none"
            draggable="false"
          />
        </Link>
      </div>
    </header>
  );
}
