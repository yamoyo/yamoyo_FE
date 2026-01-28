import TopBar from '@/shared/ui/header/TopBar';
import { useNavigate } from 'react-router-dom';
export default function TeamRoomMainPage() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        title={''}
        onBack={() => navigate('/home', { replace: true })}
        rightContent={
          <button onClick={() => {}}>
            <div className="flex items-center gap-5">
              <img
                src="/assets/icons/notification.svg"
                width={20}
                height={20}
              />
              <img src="/assets/icons/setting.svg" width={24} height={24} />
            </div>
          </button>
        }
      />
    </>
  );
}
