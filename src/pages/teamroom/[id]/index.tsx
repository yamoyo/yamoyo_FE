import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoom } from '@/entities/teamroom/model/types';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';

export default function TeamRoomMainPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [teamRoom, setTeamRoom] = useState<TeamRoom | null>(null);

  useEffect(() => {
    if (!id) return;
    getTeamRoom(id).then(setTeamRoom);
  }, [id]);

  const bannerSrc =
    TEAMROOM_IMAGES.find((img) => img.id === teamRoom?.bannerId)?.src ?? '';

  return (
    <>
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
            title=""
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
                <button type="button" className="h-10 w-10 flex-center">
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
      <section className="mx-6 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-body-1 text-tx-default">팀원</span>
            <span className="size-6 gap-[10px] rounded-lg border border-bg-card bg-bg-textfiled p-[10px] text-body-1 text-bg-secondary_2 flex-col-center">
              {teamRoom?.members.length ?? 1}
            </span>
          </div>
          <button type="button" className="px-[14px] py-[6px] flex-center">
            <img
              src="/assets/icons/arrow-left.svg"
              width={10}
              height={18}
              alt="펼치기/접기"
              className="-rotate-90"
            />
          </button>
        </div>
      </section>
    </>
  );
}
