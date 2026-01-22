/**
 * 프로필 관리 + 완료된 팀플 목록 + 알림 설정
 * 위 세 페이지로 이동할 수 있는 내부 공통 컴포넌트
 * @author junyeol
 * */
import { useNavigate } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import UserProfile from '@/shared/ui/UserProfile';
import MenuListItem from '@/shared/ui/MenuListItem';

const MENU_ITEMS = [
  {
    id: 'edit-profile',
    icon: '/assets/icons/profile-edit.svg',
    label: '프로필 관리',
    path: '/myprofile/edit',
  },
  {
    id: 'completed-tasks',
    icon: '/assets/icons/finish-team.svg',
    label: '완료 팀플 목록',
    path: '/myprofile/completed-tasks',
  },
  {
    id: 'notification',
    icon: '/assets/icons/notification.svg',
    label: '알림 설정',
    path: '/myprofile/notification-settings',
  },
] as const;

export default function MyProfileWidgets() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar title="마이페이지" onBack={() => navigate(-1)} />
      <UserProfile />
      <div className="flex flex-col gap-[15px] pl-[22px] pr-[18px] pt-[93px]">
        {MENU_ITEMS.map((item) => (
          <MenuListItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </>
  );
}
