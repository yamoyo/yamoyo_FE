import TopBar from '@/shared/ui/header/TopBar';
import NotificationList from '@/widgets/notification/ui/NotificationList';
import { useNavigate } from 'react-router-dom';

export default function NotificationPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="알림" onBack={() => navigate('/home')} />
      <NotificationList />
    </div>
  );
}
