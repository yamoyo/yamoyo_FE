import { useCallback, useEffect, useMemo, useRef } from 'react';

import { VolunteerUpdatedMessage } from '@/entities/leader-game/api/ws-types';
import { useTeamRoomWsClient } from '@/features/leader-game/ws/layout/TeamRoomWsLayout';
import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';

type Params = {
  roomId?: number | string;
  enabled?: boolean;
  onJoinSuccess?: (data: unknown) => void;
  onVoteUpdated?: (data: VolunteerUpdatedMessage) => void;
  onError?: (err: unknown) => void;
};

const wsDest = {
  joinResponse: '/user/queue/join-response',
  voteStatus: '/user/queue/vote-status',
  join: (roomId: number | string) => `/pub/room/${roomId}/join`,
  volunteer: (roomId: number | string) => `/pub/room/${roomId}/volunteer`,
  pass: (roomId: number | string) => `/pub/room/${roomId}/pass`,
} as const;

export function useLeaderGameSocket({
  roomId,
  enabled = false,
  onJoinSuccess,
  onVoteUpdated,
  onError,
}: Params) {
  const ws = useTeamRoomWsClient();

  // 최신 콜백 유지
  const handlersRef = useRef({
    onJoinSuccess,
    onVoteUpdated,
    onError,
  });

  const publish = useCallback(
    (dest: string, body?: unknown) => {
      if (!ws) return;
      ws.publish(dest, body ?? {});
    },
    [ws],
  );

  const actions = useMemo(
    () =>
      ({
        join: () => {
          if (!roomId) return;
          publish(wsDest.join(roomId), {});
        },
        volunteer: () => {
          if (!roomId) return;
          publish(wsDest.volunteer(roomId), {});
        },
        pass: () => {
          if (!roomId) return;
          publish(wsDest.pass(roomId), {});
        },
        selectGame: (gameType: GameType) => {
          if (!roomId) return;
          publish(`/pub/room/${roomId}/select-game`, { gameType });
        },
        startTiming: () => {
          if (!roomId) return;
          publish(`/pub/room/${roomId}/start-timing`, {});
        },
        submitTimingResult: (timeDifference: number) => {
          if (!roomId) return;
          publish(`/pub/room/${roomId}/submit-timing`, {
            timeDifference,
          });
        },
      }) as const,
    [roomId, publish],
  );

  useEffect(() => {
    handlersRef.current = {
      onJoinSuccess,
      onVoteUpdated,
      onError,
    };
  }, [onJoinSuccess, onVoteUpdated, onError]);

  useEffect(() => {
    if (!ws || !enabled || !roomId) return;

    // join 응답 (본인만)
    const unsubJoin = ws.subscribe(`/user/queue/join-response`, (msg) => {
      if (!msg.json) return;
      handlersRef.current.onJoinSuccess?.(msg.json);
    });

    actions.join();

    // 투표 현황 (투표 완료자만 수신)
    const unsubVote = ws.subscribe(`/user/queue/vote-status`, (msg) => {
      if (!msg.json) return;
      handlersRef.current.onVoteUpdated?.(msg.json as VolunteerUpdatedMessage);
    });

    return () => {
      unsubJoin();
      unsubVote();
    };
  }, [ws, enabled, roomId, actions]);

  return { ws, actions };
}
