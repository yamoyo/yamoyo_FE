import TopBar from '@/shared/ui/header/TopBar';
import UserProfile from '@/shared/ui/UserProfile';
import {
  basicInfoItems,
  settingsItems,
} from '@/widgets/myprofile/model/edit-profile-items';
import BasicInfoItem from '@/widgets/myprofile/ui/BasicInfoItem';
import { useModalStore } from '@/shared/ui/modal/model/choice-modal-store';
import { useNavigate } from 'react-router-dom';

const dummyData: Record<(typeof basicInfoItems)[number]['key'], string> = {
  name: '박서영',
  email: 'seoyoung.park@example.com',
  major: '컴퓨터공학',
  mbti: 'INTJ',
  joinDate: '2022-01-15',
};

export function EditProfile() {
  const openModal = useModalStore((s) => s.openChoiceModal);
  const closeModal = useModalStore((s) => s.closeModal);
  const navigate = useNavigate();

  const handleSettingClick = (item: (typeof settingsItems)[number]) => {
    const baseOptions = item.modalOptions;
    const onClickRightBtn = () => {
      // 여기에 로그아웃 또는 회원탈퇴 로직 추가
      if (item.label === '로그아웃') {
        // 로그아웃 로직
      } else {
        // 회원탈퇴 로직
      }
      navigate('/');
      closeModal();
    };

    openModal({
      ...baseOptions,
      onClickRightBtn,
    });
  };

  return (
    <>
      <TopBar title="프로필 관리" />
      <div className="space-y-[50px] px-6 pt-[18px]">
        <UserProfile characterId={9} name="박서영" />
        <div className="space-y-5">
          <p className="text-title-1 text-tx-default">기본 정보</p>
          <div className="space-y-[22px]">
            {basicInfoItems.map((item) => (
              <BasicInfoItem
                key={item.key}
                label={item.label}
                value={dummyData[item.key]}
                editRoute={item.editable ? item.key : undefined}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-5 text-title-1 text-tx-default">설정</p>
          <div className="space-y-[3px]">
            {settingsItems.map((item) => (
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
    </>
  );
}
