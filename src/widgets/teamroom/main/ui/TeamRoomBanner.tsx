import { useNavigate } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import type { TeamRoom } from '@/entities/teamroom/model/types';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';

interface TeamRoomBannerProps {
  teamRoom: TeamRoom | null;
  onSettingsClick?: () => void;
}

export default function TeamRoomBanner({
  teamRoom,
  onSettingsClick,
}: TeamRoomBannerProps) {
  const navigate = useNavigate();

  const bannerSrc =
    TEAMROOM_IMAGES.find((img) => img.id === teamRoom?.bannerId)?.src ?? '';

  return (
    <div className="relative h-[260px] w-full">
      <img
        src={bannerSrc}
        alt="팀룸 배너"
        className="h-full w-full object-cover [image-rendering:pixelated]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      <div className="absolute inset-x-0 top-0">
        <TopBar
          onBack={() => navigate('/home', { replace: true })}
          rightContent={
            <div className="flex items-center">
              <button type="button" className="h-10 w-10 flex-center">
                <img
                  src="/assets/icons/notification.svg"
                  width={20}
                  height={20}
                />
              </button>
              <button
                type="button"
                onClick={onSettingsClick}
                className="h-10 w-10 flex-center"
              >
                <img src="/assets/icons/setting.svg" width={24} height={24} />
              </button>
            </div>
          }
        />
      </div>

      <div className="absolute bottom-4 left-6 flex flex-col gap-1">
        <h1 className="text-body-4 text-tx-default">{teamRoom?.name}</h1>
        {teamRoom?.description && (
          <p className="text-caption-1 text-tx-default_3">
            {teamRoom.description}
          </p>
        )}
      </div>
    </div>
  );
}
