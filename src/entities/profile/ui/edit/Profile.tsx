import { useNavigate } from 'react-router-dom';

import { SETTINGS_MODAL_OPTIONS } from '@/entities/profile/model/options/setting-modal-options';
import BasicInfoItem from '@/entities/profile/ui/edit/BasicInfoItem';
import UserProfile from '@/entities/profile/ui/UserProfile';
import { userApi } from '@/entities/user/api/user-api';
import {
  useCurrentUser,
  useUpdateUser,
} from '@/entities/user/hooks/useCurrentUser';
import { useAuthStore } from '@/shared/api/auth/store';
import { CharacterImageId } from '@/shared/constants/char-images';
import TopBar from '@/shared/ui/header/TopBar';
import BottomPadding24 from '@/shared/ui/layout/BottomPadding24';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

import { BASIC_INFO_ITEMS } from '../../model/options/profile-items';

export function Profile() {
  const openModal = useModalStore((s) => s.openChoiceModal);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { mutate: updateUser } = useUpdateUser();

  const handleChangeCharacterId = (id: CharacterImageId) => {
    updateUser({ profileImageId: id });
  };

  const handleSettingClick = (
    item: (typeof SETTINGS_MODAL_OPTIONS)[number],
  ) => {
    const baseOptions = item.modalOptions;
    const onClickRightBtn = async () => {
      // 여기에 로그아웃 또는 회원탈퇴 로직 추가
      if (item.label === '로그아웃') {
        try {
          await userApi.logout();
          clear();
          navigate('/');
        } catch (_) {
          alert(
            '로그아웃 과정 중 일시적이 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
          );
        }
      }
    };

    openModal({
      ...baseOptions,
      onClickRightBtn,
    });
  };

  const getUserValue = (key: string) => {
    if (!user) return '';
    switch (key) {
      case 'name':
        return user.name;
      case 'email':
        return user.email;
      case 'major':
        return user.major;
      case 'mbti':
        return user.mbti;
      case 'joinDate':
        return user.createdAt.split('T')[0];
      default:
        return '';
    }
  };

  return (
    <BottomPadding24>
      <TopBar title="프로필 관리" onBack={() => navigate('/mypage')} />
      <div className="space-y-[50px] px-6 pt-[18px]">
        {user && (
          <UserProfile
            characterId={user.profileImageId}
            name={user.name}
            onChangeCharacterId={handleChangeCharacterId}
          />
        )}
        <div className="space-y-5">
          <p className="text-title-1 text-tx-default">기본 정보</p>
          <div className="space-y-[22px]">
            {BASIC_INFO_ITEMS.map((item) => (
              <BasicInfoItem
                key={item.key}
                label={item.label}
                value={getUserValue(item.key)}
                editRoute={item.editable ? item.key : undefined}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-5 text-title-1 text-tx-default">설정</p>
          <div className="space-y-[3px]">
            {SETTINGS_MODAL_OPTIONS.map((item) => (
              <button
                key={item.label}
                className="w-full pb-2 pt-3 text-left text-body-3 text-tx-default"
                onClick={() => handleSettingClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomPadding24>
  );
}
