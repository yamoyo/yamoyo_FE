import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { GameResultPayload } from '@/entities/leader-game/api/ws-types';
import { getPath } from '@/features/leader-game/ladder-game/model/get-path';
import {
  ColumnToRowsMap,
  PosAxisById,
} from '@/features/leader-game/ladder-game/model/types';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

// --- 사다리 레이아웃 상수 --- //
const LAYOUT = {
  /** 사다리 상단에 여백 (가로줄이 여백 아래부터 시작하게 두기 위함) */
  TOP_PADDING_PX: 64,
} as const;

// --- 캐릭터 아이콘 이동 거리 (게임 시작 후 이동) --- //
const MOVE = {
  /** 한 행 아래로 내려갈 때 이동 거리 (사다리 각 행 간격과 동일) */
  /** 가로줄을 타고 이동할 때 좌우 이동 거리 */
  SIDE_PX: 80,
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
  /** 마지막 추가 이동 애니메이션 시간 */
  FINAL_MOVE_MS: 600,
} as const;

export function useLadderGame(gameResultPayload: GameResultPayload) {
  const navigate = useNavigate();
  const { openCharacterModal } = useModalStore();

  const setWorkflow = useLeaderSelectionStore((s) => s.setWorkflow);

  const { participants, winnerId, winnerName, gameData } = gameResultPayload;

  const verticalLineWrapperRef = useRef<HTMLDivElement>(null);
  const [ladderHeight, setLadderHeight] = useState(0);

  // 필터링된 사다리 줄 데이터 (빈 배열 제거)
  const ladderLines = useMemo(
    () => gameData?.ladderLines.filter((l) => l.length > 0) || [],
    [gameData],
  );

  // 팀장 한 명만 지원 => gameData가 null
  const isVolunteerOnly = !gameData;

  /** 팀장 한 명만 지원 => 팀장을 첫 번째로 배치 */
  const orderedParticipants = useMemo(() => {
    if (!isVolunteerOnly) return participants;

    const idx = participants.findIndex((p) => p.userId === winnerId);
    if (idx <= 0) return participants; // 이미 첫번째거나 못 찾으면 그대로

    const winner = participants[idx];
    const rest = participants.filter((_, i) => i !== idx);
    return [winner, ...rest];
  }, [isVolunteerOnly, participants, winnerId]);

  const [gameStarted, setGameStarted] = useState(false);
  const [columnToRowsMap, setColumnToRowsMap] = useState<ColumnToRowsMap>(
    new Map(),
  );
  const [posById, setPosById] = useState<PosAxisById>(() =>
    orderedParticipants.reduce<PosAxisById>((acc, u) => {
      acc[u.userId] = { x: 0, y: 0 };
      return acc;
    }, {}),
  );
  // 이동 완료한 사용자 ID 목록
  const [finishedSet, setFinishedSet] = useState<Set<number>>(() => new Set());
  const markFinished = useCallback((userId: number) => {
    setFinishedSet((prev) => {
      if (prev.has(userId)) return prev; // 중복 방지
      const next = new Set(prev);
      next.add(userId);
      return next;
    });
  }, []);

  // 타이머 ID 저장용 ref
  const timeoutsRef = useRef<number[]>([]);

  // 사다리 행 개수에 따른 레일 높이 계산
  const ROWS = ladderLines.length;

  // 행 간격 계산 (사다리 높이 - 상단 여백) / 행 개수
  const ROW_GAP =
    ladderHeight > 0 && ROWS > 0
      ? (ladderHeight - LAYOUT.TOP_PADDING_PX) / ROWS
      : 0;

  const DOWN_PX = ROW_GAP;

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

  useLayoutEffect(() => {
    const el = verticalLineWrapperRef.current;
    if (!el) return;

    const update = () => {
      setLadderHeight(el.clientHeight);
    };

    update(); // 첫 측정

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setColumnToRowsMap(createColumnToRowsMap(ladderLines));
  }, [ladderLines]);

  // 예약된 타이머 정리
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  useEffect(() => {
    // 모든 참가자 이동 완료 시
    if (finishedSet.size === orderedParticipants.length) {
      clearAllTimeouts();

      const winnerProfileImageId = orderedParticipants.find(
        (u) => u.userId === winnerId,
      )?.profileImageId;

      if (!winnerProfileImageId) {
        alert('예기치 못한 오류가 발생하였습니다. 다시 시도해 주세요.');
        return;
      }
      openCharacterModal({
        title: `${winnerName}님! 팀장으로 선택되었습니다.`,
        subTitle: '축하합니다. 팀 빌딩을 이어가주세요.',
        type: 'CROWN',
        characterId: winnerProfileImageId,
        buttonText: '팀룸으로 이동',
        onClick: () => {
          navigate('..', { replace: true });
          setWorkflow('SETUP');
        },
      });
    }
  }, [
    orderedParticipants.length,
    clearAllTimeouts,
    navigate,
    openCharacterModal,
    setWorkflow,
    winnerId,
    winnerName,
    orderedParticipants,
    finishedSet,
  ]);

  /**
   * 참가자 이동 애니메이션 예약 함수
   *
   * ### 역할
   * - 특정 참가자의 캐릭터 이동 애니메이션을 예약
   * - 실제로 즉시 이동하는 것이 아니라, row(행) 단위로 이동해야 할 시점마다 `setTimeout`을 등록해
   *   일정 시간 뒤 `posById`를 업데이트하는 방식으로 애니메이션을 구현
   *
   * ### 입력
   * @param userId
   * @param startIndex - 참가자가 시작하는 사다리 열(column) 인덱스 (orderedParticipants의 idx와 대응)
   * @param startDelayMs - 해당 참가자의 시작 지연 시간. (동시에 출발하지 않도록 딜레이를 주기 위함)
   *
   * ### 동작 흐름
   * 1) 현재 시간 포인터(t)를 startDelayMs로 초기화하고,
   *    현재 좌표(currentX, currentY)를 시작 위치로 설정
   *
   * 2) 사다리 데이터가 없을 때(= 팀장 한 명만 지원)
   *    - 아래로 내려가는 연출만 수행
   *
   * 3) 사다리 데이터가 있을 때
   *    - getPath(startIndex, ladderLines)로 각 row를 통과할 때 col이 어떻게 바뀌는지 경로를 계산
   *    - 각 row마다 다음을 수행
   *      (a) 아래로 이동(DOWN_PX) 타이머를 예약하고
   *      (b) 해당 row에서 col이 바뀌었다면(= 가로줄을 탔다면),
   *          TURN_GAP_MS만큼 시간 텀을 둔 뒤, 좌/우 이동(SIDE_PX) 타이머를 추가로 예약
   *    - 모든 이동 처리 후, '통과/팀장 당첨' 박스 가운데로 내려 가도록 추가 예약
   *
   * 4) 예약한 타이머 ID들은 timeoutsRef에 저장
   *
   * ### 반환값
   * @returns 애니메이션이 끝나는 예상 시각
   *
   */
  const scheduleMove = useCallback(
    (userId: number, startIndex: number, startDelayMs: number) => {
      let t = startDelayMs;

      let currentX = 0;
      let currentY = 10;

      // gameData가 null -> 이미 방장이 정해졌을 때: 아래로만 내려가는 연출
      if (!ladderLines.length) {
        for (let i = 0; i < ROWS; i++) {
          timeoutsRef.current.push(
            window.setTimeout(() => {
              currentY += DOWN_PX;
              setPosById((prev) => ({
                ...prev,
                [userId]: { x: currentX, y: currentY },
              }));
            }, t),
          );
          t += TIMING.DOWN_MS;
        }

        // 마지막 박스까지 살짝 더 내려가는 연출
        timeoutsRef.current.push(
          window.setTimeout(() => {
            currentY += MOVE.FINAL_DOWN_PX;
            setPosById((prev) => ({
              ...prev,
              [userId]: { x: currentX, y: currentY },
            }));
            markFinished(userId);
          }, t),
        );

        return t + TIMING.DOWN_MS;
      }

      const path = getPath(startIndex, ladderLines);
      const steps = path.slice(1);
      let prevCol = path[0].col;

      steps.forEach((step) => {
        timeoutsRef.current.push(
          window.setTimeout(() => {
            currentY += DOWN_PX;
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

      // 이동이 끝난 후 캐릭터가 박스 가운데에 위치하도록 약간 더 내려감
      timeoutsRef.current.push(
        window.setTimeout(() => {
          currentY += MOVE.FINAL_DOWN_PX;
          setPosById((prev) => ({
            ...prev,
            [userId]: { x: currentX, y: currentY },
          }));
        }, t),
      );

      timeoutsRef.current.push(
        window.setTimeout(() => {
          markFinished(userId);
        }, t + TIMING.FINAL_MOVE_MS),
      );

      return t + TIMING.DOWN_MS + TIMING.FINAL_MOVE_MS;
    },
    [DOWN_PX, ladderLines, ROWS, markFinished],
  );

  // 게임 시작 처리
  const handleGameStart = useCallback(() => {
    if (gameStarted) return;

    setGameStarted(true);

    // 각 참가자별로 이동 애니메이션 타이머를 예약
    orderedParticipants.forEach((u, idx) => {
      scheduleMove(u.userId, idx, idx * TIMING.START_STAGGER_MS);
    });
  }, [orderedParticipants, gameStarted, scheduleMove]);

  return {
    orderedParticipants,
    gameStarted,
    posById,
    TIMING,
    columnToRowsMap,
    ROW_GAP,
    LAYOUT,
    handleGameStart,
    verticalLineWrapperRef,
  };
}
