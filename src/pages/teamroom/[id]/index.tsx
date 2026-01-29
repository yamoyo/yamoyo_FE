import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoom } from '@/entities/teamroom/model/types';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';
import BottomButton from '@/shared/ui/button/BottomButton';

export default function TeamRoomMainPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [teamRoom, setTeamRoom] = useState<TeamRoom | null>(null);
  const [isMemberListOpen, setIsMemberListOpen] = useState(true);

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
      <section className="mx-6 my-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-body-1 text-tx-default">팀원</span>
            <span className="size-6 gap-[10px] rounded-lg border border-bg-card bg-bg-textfiled text-body-1 text-bg-secondary_2 flex-col-center">
              {teamRoom?.members.length ?? 1}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMemberListOpen((prev) => !prev)}
              aria-expanded={isMemberListOpen}
              className="px-[14px] py-[6px] flex-center"
            >
              <img
                src="/assets/icons/arrow-left.svg"
                width={10}
                height={18}
                alt="펼치기/접기"
                className={isMemberListOpen ? '-rotate-90' : 'rotate-90'}
              />
            </button>
          </div>
        </div>
        {isMemberListOpen && (
          <ul className="flex flex-wrap gap-x-4 gap-y-3">
            {teamRoom?.members.map((member) => {
              const isLeader =
                member.role === 'leader' ||
                member.role === '방장' ||
                member.role === '팀장';

              return (
                <li
                  key={member.id}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative h-16 w-16 flex-center">
                    <img
                      src="/assets/character/char-bg.png"
                      width={64}
                      height={64}
                      alt="프로필 이미지 배경"
                      draggable={false}
                    />
                    <img
                      src={member.avatar}
                      width={36}
                      height={26}
                      alt={member.name}
                      className="absolute"
                      draggable={false}
                    />
                    {isLeader && (
                      <img
                        src="/assets/icons/leader.svg"
                        alt="leader"
                        width={16}
                        height={16}
                        className="absolute bottom-2 right-2"
                      />
                    )}
                  </div>
                  <span className="text-body-6 text-tx-default_3">
                    {member.name}
                  </span>
                </li>
              );
            })}
            <li className="flex flex-col items-center gap-2">
              <button
                type="button"
                className="h-16 w-16 select-none flex-center"
              >
                <img
                  src="/assets/icons/plus.svg"
                  width={64}
                  height={64}
                  alt="멤버 추가"
                  draggable="false"
                />
              </button>
            </li>
          </ul>
        )}
      </section>
      <section
        className="mx-auto flex h-[220px] w-full max-w-[342px] flex-col items-center gap-5 rounded-[12px] border-2"
        style={{
          borderColor: 'var(--bg-bg_card, #3D4366)',
          background:
            'radial-gradient(395.32% 169.68% at 50% 53.7%, rgba(129, 103, 196, 0.38) 0%, rgba(53, 62, 117, 0.25) 52.99%, rgba(47, 52, 83, 0.77) 100%)',
        }}
      >
        <div className="mt-4 flex w-full flex-col items-start px-5">
          <span className="text-body-1 text-tx-default">팀장 정하기</span>
          <span className="text-caption-1 text-tx-default_4">
            팀원이 모이면 팀장 정하기 게임이 시작됩니다.
          </span>
        </div>
        <img
          src="/assets/character/char-crown.png"
          width={78}
          height={56}
          alt=""
        />
        <BottomButton
          text="START"
          onClick={() => {}}
          // disabled={} 실시간 통신 로직이 있어야 비활성화인지 활성화일지를 판단 가능할 듯 함.
          className="h-12 w-[302px] gap-[10px] bg-bg-secondary_2 px-[80px] py-[16px] font-galmuri-11 text-[17px] font-bold text-tx-default_black flex-center disabled:bg-tx-default_5 disabled:text-tx-default_4"
        />
      </section>
    </>
  );
}
