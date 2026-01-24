import TopBar from '@/shared/ui/header/TopBar';
import UserProfile from '@/shared/ui/UserProfile';
import {
  basicInfoItems,
  settingsItems,
} from '@/widgets/myprofile/model/edit-profile-items';
import BasicInfoItem from '@/widgets/myprofile/ui/BasicInfoItem';

const dummyData: Record<(typeof basicInfoItems)[number]['key'], string> = {
  name: '박서영',
  email: 'seoyoung.park@example.com',
  major: '컴퓨터공학',
  mbti: 'INTJ',
  joinDate: '2022-01-15',
};

export default function EditProfile() {
  return (
    <>
      <TopBar title="프로필 관리" />
      <div className="space-y-[50px] px-6 pt-[18px]">
        <UserProfile characterId={9} name="박서영" />
        <div className="space-y-5">
          <h1 className="text-title-1 text-tx-default">기본 정보</h1>
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
          <h1 className="mb-5 text-title-1 text-tx-default">설정</h1>
          <div className="space-y-[3px]">
            {settingsItems.map((item) => (
              <button
                key={item.label}
                className="w-full pb-2 pt-3 text-left text-body-3 text-tx-default"
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
