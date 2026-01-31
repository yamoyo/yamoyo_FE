import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/shared/config/tailwind/cn';
import { useHorizontalDragScroll } from '@/shared/hooks/useHorizontalDragScroll';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

import GameStartButton from '../../ui/GameStartButton';
import { DUMMY_LADDER } from '../model/user-dummy';
import {
  ColumnToRowsMap,
  LadderGameResponse,
  PosAxisById,
  Step,
} from '../model/types';
import ResultButton from './ResultButton';

interface Props {
  teamLeaderIndex: number;
  containerClassName?: string;
}

// 에셋 경로
const VERTICAL_SRC = '/assets/game/ladder/ladder-line-long.svg';
const HORIZONTAL_SRC = '/assets/game/ladder/ladder-line-short.svg';

// --- 사다리 레이아웃 상수 --- //
const LAYOUT = {
  /** 사다리 상단에 여백 (가로줄이 여백 아래부터 시작하게 두기 위함) */
  TOP_PADDING_PX: 64,
  /** 사다리 각 행(가로줄) 간의 간격 */
  ROW_GAP_PX: 36,
} as const;

// --- 캐릭터 아이콘 이동 거리 (게임 시작 후 이동) --- //
const MOVE = {
  /** 한 행 아래로 내려갈 때 이동 거리 (사다리 각 행 간격과 동일) */
  DOWN_PX: LAYOUT.ROW_GAP_PX,
  /** 가로줄을 타고 이동할 때 좌우 이동 거리 */
  SIDE_PX: 72,
  /** 마지막 박스까지 내려가는 추가 이동 거리 */
  FINAL_DOWN_PX: 56,
} as const;

// --- 캐릭터 아이콘 이동 타이밍 (게임 시작 후 이동) --- //
const TIMING = {
  /** 아래로 내려가는 데 걸리는 애니메이션 시간 */
  DOWN_MS: 520,
  /** 좌우 이동 간에 걸리는 애니메이션 시간 */
  SIDE_MS: 420,
  /** 아래->좌우 전환 시 대기 시간 */
  TURN_GAP_MS: 50,
  /** 각 캐릭터 간 시작 지연 시간
   *
   * - 동시에 출발하지 않고 설정한 시간만큼 늦게 출발함
   */
  START_STAGGER_MS: 40,
} as const;

// 내 유저 아이디 (TODO 추후 서버 연동 시 교체)
const MY_USER_ID = 3;

// 사다리 가로줄 위치 계산용 맵 생성
const createColumnToRowsMap = (ladderLines: number[][]) => {
  const map: ColumnToRowsMap = new Map();

  ladderLines.forEach((rows, i) => {
    for (const row of rows) {
      const current = map.get(row);
      if (current) current.push(i);
      else map.set(row, [i]);
    }
  });

  return map;
};

export default function LadderBoard({
  teamLeaderIndex,
  containerClassName,
}: Props) {
  const { bind } = useHorizontalDragScroll<HTMLDivElement>();
  const { openCharacterModal } = useModalStore();
  const navigate = useNavigate();

  const [gameStarted, setGameStarted] = useState(false);
  const [data, setData] = useState<LadderGameResponse | null>(null);
  const [columnToRowsMap, setColumnToRowsMap] = useState<ColumnToRowsMap>(
    new Map(),
  );
  const [posById, setPosById] = useState<PosAxisById | null>(null);

  // 타이머 ID 저장용 ref
  const timeoutsRef = useRef<number[]>([]);

  // 사다리 행 개수에 따른 레일 높이 계산
  const ROWS = data?.gameData.ladderLines.length ?? 0;
  const RAIL_HEIGHT_PX = LAYOUT.TOP_PADDING_PX + (ROWS - 1) * LAYOUT.ROW_GAP_PX;

  useEffect(() => {
    // TODO: 서버에서 사다리 게임 데이터 받아오는 로직
    const filteredLadderLines = DUMMY_LADDER.gameData.ladderLines.filter(
      (l) => l.length > 0,
    );

    setData({
      ...DUMMY_LADDER,
      gameData: { ladderLines: filteredLadderLines },
    });

    setColumnToRowsMap(createColumnToRowsMap(filteredLadderLines));
    setPosById(() =>
      DUMMY_LADDER.participants.reduce<PosAxisById>((acc, u) => {
        acc[u.userId] = { x: 0, y: 0 };
        return acc;
      }, {}),
    );
  }, []);

  // 예약된 타이머 정리
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  // 시작 열에서 목표 열까지 경로 계산
  const getPath = useCallback(
    (startIndex: number, ladder: number[][]): Step[] => {
      let col = startIndex;
      const path: Step[] = [{ row: -1, col }];

      ladder.forEach((row, rowIdx) => {
        if (row.includes(col)) col += 1;
        else if (row.includes(col - 1)) col -= 1;
        path.push({ row: rowIdx, col });
      });

      return path;
    },
    [],
  );

  // 캐릭터 이동 애니메이션 스케줄링
  const scheduleMove = useCallback(
    (userId: number, startIndex: number, startDelayMs: number) => {
      if (!data) return 0;

      const path = getPath(startIndex, data.gameData.ladderLines ?? []);
      const steps = path.slice(1);

      let currentX = 0;
      let currentY = 10;
      let prevCol = path[0].col;

      let t = startDelayMs;

      steps.forEach((step) => {
        timeoutsRef.current.push(
          window.setTimeout(() => {
            currentY += MOVE.DOWN_PX;
            setPosById((prev) => ({
              ...prev,
              [userId]: { x: currentX, y: currentY },
            }));
          }, t),
        );
        t += TIMING.DOWN_MS;

        if (step.col !== prevCol) {
          const direction = step.col > prevCol ? 1 : -1;
          t += TIMING.TURN_GAP_MS;

          timeoutsRef.current.push(
            window.setTimeout(() => {
              currentX += direction * MOVE.SIDE_PX;
              setPosById((prev) => ({
                ...prev,
                [userId]: { x: currentX, y: currentY },
              }));
            }, t),
          );

          t += TIMING.SIDE_MS;
        }

        prevCol = step.col;
      });

      // 마지막으로 아래 박스로 이동할 수 있도록 처리
      timeoutsRef.current.push(
        window.setTimeout(() => {
          currentY += MOVE.FINAL_DOWN_PX;
          setPosById((prev) => ({
            ...prev,
            [userId]: { x: currentX, y: currentY },
          }));
        }, t),
      );

      return t + TIMING.DOWN_MS;
    },
    [data, getPath],
  );

  // 게임 시작 처리
  const handleGameStart = useCallback(() => {
    if (!data || gameStarted) return;

    setGameStarted(true);
    clearAllTimeouts();

    setPosById(() =>
      data.participants.reduce<PosAxisById>((acc, u) => {
        acc[u.userId] = { x: 0, y: 0 };
        return acc;
      }, {}),
    );

    let maxEnd = 0;

    data.participants.forEach((u, idx) => {
      const endAt = scheduleMove(u.userId, idx, idx * TIMING.START_STAGGER_MS);
      maxEnd = Math.max(maxEnd, endAt);
    });

    const winnerCharacterId = data.participants.find(
      (u) => u.userId === data.winnerId,
    )?.characterId;

    if (!winnerCharacterId) {
      alert('예기치 못한 오류가 발생하였습니다. 다시 시도해 주세요.');
      return;
    }

    const modalAt = maxEnd + 200;

    timeoutsRef.current.push(
      window.setTimeout(() => {
        openCharacterModal({
          title: `${data.winnerName}님! 팀장으로 선택되었습니다.`,
          subTitle: '축하합니다. 팀 빌딩을 이어가주세요.',
          type: 'CROWN',
          characterId: winnerCharacterId,
          buttonText: '확인',
          onClick: () => navigate('..', { replace: true }),
        });
      }, modalAt),
    );
  }, [
    data,
    gameStarted,
    clearAllTimeouts,
    scheduleMove,
    openCharacterModal,
    navigate,
  ]);

  if (!data) {
    // TODO: 로딩 처리
    return <p>데이터를 불러오고 있습니다.</p>;
  }

  return (
    <div
      className={cn(
        'flex flex-grow flex-col items-center justify-between gap-8 pb-8',
        containerClassName,
      )}
    >
      <div
        {...bind}
        className={cn(
          'no-scrollbar w-full overflow-x-auto overflow-y-hidden',
          'cursor-grab select-none active:cursor-grabbing',
        )}
      >
        <div className="w-max pl-6 pr-4">
          <div className="relative z-10">
            <div className="flex gap-2">
              {data?.participants.map((user, i) => (
                <div
                  key={user.userId}
                  className="relative flex flex-col items-center"
                >
                  <div className="gap-1 flex-col-center">
                    <p
                      className={cn(
                        'select-none text-center text-body-7 text-tx-default',
                        {
                          'opacity-0': user.userId !== MY_USER_ID,
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
                        src={`/assets/character/char-${user.characterId}.png`}
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
                            transition: `transform ${TIMING.DOWN_MS}ms linear`,
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
                              src={`/assets/character/char-${user.characterId}.png`}
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
                    className="mt-[-10px] w-[16px] overflow-hidden"
                    style={{ height: RAIL_HEIGHT_PX }}
                  >
                    <img
                      src={VERTICAL_SRC}
                      alt="vertical line"
                      draggable={false}
                      className="h-full w-full select-none object-cover"
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
                        top:
                          (y + 1) * LAYOUT.ROW_GAP_PX + LAYOUT.TOP_PADDING_PX,
                        pointerEvents: 'none',
                      }}
                    />
                  ))}

                  <ResultButton
                    type={i === teamLeaderIndex ? 'LEADER' : 'PASS'}
                  />
                </div>
              ))}
            </div>
          </div>
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
