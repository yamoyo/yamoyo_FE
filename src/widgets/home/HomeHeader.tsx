import { Link } from 'react-router-dom';

import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser';

/**
 * 홈뷰 페이지 헤더 컴포넌트
 * @author junyeol
 */

export default function HomeHeader() {
  const { data: user } = useCurrentUser();

  const profileImageSrc = user
    ? `/assets/character/char-${user.profileImageId}.png`
    : '/assets/home/home-example-profile.png';

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

        {/* TODO: MVP 이후 알림 기능 연결 시 hidden 제거 */}
        <Link to="/notification" draggable="false" className="hidden">
          <img
            src="/assets/icons/notification.svg"
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
            src={profileImageSrc}
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
