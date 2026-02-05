import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { VolunteerUpdatedMessage } from '@/entities/leader-game/api/ws-types';
import { useTeamRoomWsClient } from '@/features/leader-game/ws/layout/TeamRoomWsLayout';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
import { useAuthStore } from '@/shared/api/auth/store';
import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';

type Params = {
  roomId?: number | string;
  enabled?: boolean;
  onJoinResponse: (data: VolunteerUpdatedMessage) => void;
  onError?: (err: unknown) => void;
};

const wsDest = {
  onJoinResponse: (roomId: number | string, userId: string | number) =>
    `/sub/room/${roomId}/user/${userId}`,
  join: (roomId: number | string) => `/pub/room/${roomId}/join`,
  volunteer: (roomId: number | string) => `/pub/room/${roomId}/volunteer`,
  pass: (roomId: number | string) => `/pub/room/${roomId}/pass`,
  selectGame: (roomId: number | string) => `/pub/room/${roomId}/select-game`,
  startTiming: (roomId: number | string) => `/pub/room/${roomId}/start-timing`,
  submitTimingResult: (roomId: number | string) =>
    `/pub/room/${roomId}/timing-result`,
} as const;

export function useLeaderGameSocket({
  roomId,
  enabled = false,
  onJoinResponse,
  onError,
}: Params) {
  const ws = useTeamRoomWsClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  const canConnectOnMain = useLeaderSelectionStore((s) => s.canConnectOnMain);

  // 최신 콜백 유지
  const handlersRef = useRef({
    onJoinResponse,
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
          publish(wsDest.selectGame(roomId), { gameType });
        },
        startTiming: () => {
          if (!roomId) return;
          publish(wsDest.startTiming(roomId), {});
        },
        submitTimingResult: (timeDifference: number) => {
          if (!roomId) return;
          publish(wsDest.submitTimingResult(roomId), {
            timeDifference,
          });
        },
      }) as const,
    [roomId, publish],
  );

  useEffect(() => {
    handlersRef.current = {
      onJoinResponse,
      onError,
    };
  }, [onJoinResponse, onError]);

  useEffect(() => {
    if (!ws || !enabled || !roomId || !canConnectOnMain) return;
    if (!accessToken) return;

    const userId = jwtDecode<{ sub: string }>(accessToken).sub as string;

    if (!userId) return;

    // 개인 메시지 수신 처리 (reload 응답, 투표 현황, 에러)
    const unsubJoinResponse = ws.subscribe(
      wsDest.onJoinResponse(roomId, userId),
      (msg) => {
        if (!msg.json) return;
        handlersRef.current.onJoinResponse?.(
          msg.json as VolunteerUpdatedMessage,
        );
      },
    );

    actions.join();
    return () => unsubJoinResponse();
  }, [ws, enabled, roomId, actions, accessToken, canConnectOnMain]);

  return { ws, actions };
}
