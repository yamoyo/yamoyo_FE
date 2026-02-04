import { useEffect, useMemo, useRef } from 'react';

import { useAuthStore } from '@/shared/api/auth/store';
import { createStompClient } from '@/shared/api/ws/stompClient';

type Params = {
  teamRoomId: number | string;
  enabled?: boolean;
  onRoomMessage?: (msg: unknown) => void;
  onError?: (err: unknown) => void;
};

export function useLeaderGameSocket({
  teamRoomId,
  enabled = false,
  onRoomMessage,
  onError,
}: Params) {
  const accessToken = useAuthStore((s) => s.accessToken);

  const onRoomMessageRef = useRef<Params['onRoomMessage']>(onRoomMessage);
  const onErrorRef = useRef<Params['onError']>(onError);

  useEffect(() => {
    onRoomMessageRef.current = onRoomMessage;
  }, [onRoomMessage]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const ws = useMemo(() => {
    if (!accessToken || !enabled) return null;

    const client = createStompClient({
      accessToken,
      onError: (err) => onErrorRef.current?.(err),
      onConnect: () => {
        // 팀룸 구독
        client.subscribe(`/sub/room/${teamRoomId}`, (msg) => {
          if (!msg.json) return;
          onRoomMessageRef.current?.(msg.json);
        });

        // // 2) join 응답 (본인만)
        // client.subscribe(`/user/queue/join-response`, (msg) => {
        //   if (!msg.json) return;
        //   onJoinSuccess?.(msg.json);
        // });

        // // 3) 투표 현황 (투표 완료자만 수신)
        // client.subscribe(`/user/queue/vote-status`, (msg) => {
        //   if (!msg.json) return;
        //   onVoteUpdated?.(msg.json);
        // });
      },
    });

    return client;
  }, [accessToken, enabled, teamRoomId]);

  useEffect(() => {
    if (!ws) return;

    ws.connect();
    return () => ws.disconnect();
  }, [ws]);

  return ws;
}
