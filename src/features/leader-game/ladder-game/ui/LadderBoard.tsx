import { jwtDecode } from 'jwt-decode';

import { GameResultPayload } from '@/entities/leader-game/api/ws-types';
import { useLadderGame } from '@/features/leader-game/ladder-game/model/useLadderGame';
import ResultButton from '@/features/leader-game/ladder-game/ui/ResultButton';
import { useAuthStore } from '@/shared/api/auth/store';
import { cn } from '@/shared/config/tailwind/cn';
import { useHorizontalDragScroll } from '@/shared/hooks/useHorizontalDragScroll';
import GameStartButton from '@/widgets/teamroom/main/ui/GameStartButton';

interface Props {
  teamLeaderIndex: number;
  gameResultPayload: GameResultPayload;
  containerClassName?: string;
}

// 에셋 경로
const VERTICAL_SRC = '/assets/game/ladder/ladder-line-long.svg';
const HORIZONTAL_SRC = '/assets/game/ladder/ladder-line-short.svg';

export default function LadderBoard({
  teamLeaderIndex,
  gameResultPayload,
  containerClassName,
}: Props) {
  const { bind } = useHorizontalDragScroll<HTMLDivElement>();

  const accessToken = useAuthStore((s) => s.accessToken);
  const myUserId = accessToken
    ? jwtDecode<{ sub: string }>(accessToken).sub
    : null;

  const {
    orderedParticipants,
    gameStarted,
    posById,
    TIMING,
    columnToRowsMap,
    ROW_GAP,
    LAYOUT,
    verticalLineWrapperRef,
    isVolunteerOnly,
    handleGameStart,
  } = useLadderGame(gameResultPayload);

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-8 overflow-hidden pb-8',
        containerClassName,
      )}
    >
      <div
        {...bind}
        className={cn(
          'no-scrollbar flex w-full overflow-x-auto',
          'cursor-grab select-none active:cursor-grabbing',
        )}
      >
        <div className="flex flex-grow gap-2 pl-6 pr-4">
          {orderedParticipants.map((user, i) => (
            <div
              key={user.userId}
              className="relative flex flex-col justify-center"
            >
              <div className="gap-1 flex-col-center">
                <p
                  className={cn(
                    'select-none text-center text-body-7 text-tx-default',
                    {
                      'opacity-0': user.userId !== Number(myUserId),
                    },
                  )}
                >
                  나
                </p>
                <div
                  className="relative h-[64px] w-[64px] flex-center"
                  style={{
                    backgroundImage:
                      'url(/assets/game/ladder/character-bg.svg)',
                  }}
                >
                  <img
                    src={`/assets/character/char-${user.profileImageId}.png`}
                    alt="character"
                    className="h-10 w-10 select-none"
                    draggable={false}
                    style={{
                      filter: 'drop-shadow(2px 2px 0 #79769B)',
                    }}
                  />

                  {gameStarted && posById && (
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translateY(${posById[user.userId]?.y ?? 0}px) translate(-50%, -50%)`,
                        transition: `transform ${isVolunteerOnly ? TIMING.VOLUNTEER_ONLY_DOWN_MS : TIMING.DOWN_MS}ms linear`,
                        pointerEvents: 'none',
                        zIndex: 20,
                      }}
                    >
                      <div
                        style={{
                          transform: `translateX(${posById[user.userId]?.x ?? 0}px)`,
                          transition: `transform ${TIMING.SIDE_MS}ms linear`,
                        }}
                      >
                        <img
                          src={`/assets/character/char-${user.profileImageId}.png`}
                          alt="moving character"
                          className="min-h-10 min-w-10 select-none"
                          draggable={false}
                          style={{
                            filter: 'drop-shadow(2px 2px 0 #79769B)',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                ref={i === 0 ? verticalLineWrapperRef : undefined}
                className="mt-[-10px] flex justify-center overflow-hidden"
              >
                <img
                  src={VERTICAL_SRC}
                  alt="vertical line"
                  draggable={false}
                  className="w-4 select-none object-none object-top"
                />
              </div>
              {columnToRowsMap.get(i)?.map((y, idx) => (
                <img
                  key={idx}
                  src={HORIZONTAL_SRC}
                  alt="horizontal line"
                  className="pointer-events-none absolute left-[calc(50%)] z-10 min-w-[74px] select-none"
                  draggable={false}
                  style={{
                    top: (y + 1) * ROW_GAP + LAYOUT.TOP_PADDING_PX,
                    pointerEvents: 'none',
                  }}
                />
              ))}

              <ResultButton type={i === teamLeaderIndex ? 'LEADER' : 'PASS'} />
            </div>
          ))}
        </div>
      </div>

      <GameStartButton
        onClick={handleGameStart}
        color={gameStarted ? 'gray' : 'white'}
        text="게임시작"
        disabled={gameStarted}
      />
    </div>
  );
}
