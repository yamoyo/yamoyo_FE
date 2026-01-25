import TopBar from '@/shared/ui/header/TopBar';
import NotificationToggle from '@/widgets/mypage/notification-settings/ui/NotificationToggle';
export default function NotificationSettings() {
  return (
    <>
      <TopBar title="알림 설정" />
      <NotificationToggle />
    </>
  );
}
