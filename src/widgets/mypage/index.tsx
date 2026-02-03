/**
 * 프로필 관리 + 완료된 팀플 목록 + 알림 설정
 * 위 세 페이지로 이동할 수 있는 내부 공통 컴포넌트
 * @author junyeol
 * */
import { useNavigate } from 'react-router-dom';

import UserProfile from '@/entities/profile/ui/UserProfile';
import {
  useCurrentUser,
  useUpdateUser,
} from '@/entities/user/hooks/useCurrentUser';
import { CharacterImageId } from '@/shared/constants/char-images';
import TopBar from '@/shared/ui/header/TopBar';
import BottomPadding24 from '@/shared/ui/layout/BottomPadding24';
import MenuListItem from '@/shared/ui/MenuListItem';

const MENU_ITEMS = [
  {
    id: 'profile',
    icon: '/assets/icons/profile-edit.svg',
    label: '프로필 관리',
    path: '/mypage/profile',
  },
  {
    id: 'completed-tasks',
    icon: '/assets/icons/finish-team.svg',
    label: '완료 팀플 목록',
    path: '/mypage/completed-tasks',
  },
  {
    id: 'notification',
    icon: '/assets/icons/notification.svg',
    label: '알림 설정',
    path: '/mypage/notification-settings',
  },
] as const;

export default function Mypage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { mutate: updateUser } = useUpdateUser();

  const handleChangeCharacterId = (id: CharacterImageId) => {
    updateUser({ profileImageId: id });
  };

  return (
    <BottomPadding24>
      <TopBar title="마이페이지" onBack={() => navigate('/home')} />
      {user && (
        <UserProfile
          name={user.name}
          characterId={user.profileImageId}
          onChangeCharacterId={handleChangeCharacterId}
          className="pt-[18px]"
        />
      )}
      <div className="flex flex-col gap-[15px] px-6 pt-[50px]">
        {MENU_ITEMS.map((item) => (
          <MenuListItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </BottomPadding24>
  );
}
