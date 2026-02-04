import { useNavigate } from 'react-router-dom';

import type { TeamRoomDetail } from '@/entities/teamroom/api/teamroom-dto';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';
import TopBar from '@/shared/ui/header/TopBar';

interface TeamRoomBannerProps {
  teamRoom: TeamRoomDetail | null;
  onSettingsClick?: () => void;
}

export default function TeamRoomBanner({
  teamRoom,
  onSettingsClick,
}: TeamRoomBannerProps) {
  const navigate = useNavigate();

  const bannerSrc =
    TEAMROOM_IMAGES.find((img) => img.id === teamRoom?.bannerImageId)?.src ??
    null;

  return (
    <div className="relative h-[260px] w-full">
      {bannerSrc && (
        <img
          src={bannerSrc}
          alt="팀룸 배너"
          className="h-full w-full select-none object-cover [image-rendering:pixelated]"
          draggable="false"
        />
      )}
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
                  className="select-none"
                  draggable="false"
                />
              </button>
              <button
                type="button"
                onClick={onSettingsClick}
                className="h-10 w-10 flex-center"
              >
                <img
                  src="/assets/icons/setting.svg"
                  width={24}
                  height={24}
                  className="select-none"
                  draggable="false"
                />
              </button>
            </div>
          }
        />
      </div>

      <div className="absolute bottom-4 left-6 flex flex-col gap-1">
        <h1 className="text-body-4 text-tx-default">{teamRoom?.title}</h1>
        {teamRoom?.description && (
          <p className="text-caption-1 text-tx-default_3">
            {teamRoom.description}
          </p>
        )}
      </div>
    </div>
  );
}
