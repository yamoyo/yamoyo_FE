/**
 * 프로필 관리 + 완료된 팀플 목록 + 알림 설정
 * 위 세 페이지로 이동할 수 있는 내부 공통 컴포넌트
 * @author junyeol
 * */
import PrevButton from '@/shared/ui/prevButton';
import UserProfile from '@/shared/ui/userProfile';
import ImageSelect from '@/shared/ui/imageSelect';

export default function MyProfileWidgets() {
  return (
    <div>
      <PrevButton title="마이페이지" />
      <UserProfile />
      <ImageSelect />
    </div>
  );
}
