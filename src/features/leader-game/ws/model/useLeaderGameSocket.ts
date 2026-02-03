import { useEffect, useMemo } from 'react';

import { useAuthStore } from '@/shared/api/auth/store';
import { createStompClient } from '@/shared/api/ws/stompClient';

type Params = {
  teamRoomId: number | string;
  enabled?: boolean;
  onRoomMessage?: (msg: unknown) => void;
  onError?: (err: unknown) => void;
};

/**
 * ### 팀장 선출 게임 WebSocket 연결 Hook
 *
 * 1. 팀룸 접속
 * - 팀룸 접속 시 사용자는 `/sub/room/${teamRoomId}`을 구독합니다.
 * - 다른 사용자는 해당 구독을 하면 구독하고 있던 사용자에게 메시지를 받습니다.
 * - 받은 메시지를 통해 방장은 모두가 팀룸에 접속했는지 확인할 수 있습니다.
 *
 * 2. 팀장 게임 시작
 * - Swagger에 정의된 API를 통해 팀장 게임을 시작합니다.
 * - 팀장 게임이 시작되면 클라이언트는 `/sub/room/${teamRoomId}`를 포함하여 아래 2가지를 추가로 구독합니다.
 * - `/user/queue/join-response`, `/user/queue/vote-status`
 *
 */
export function useLeaderGameSocket({
  teamRoomId,
  enabled = false,
  onRoomMessage,
  onError,
}: Params) {
  const accessToken = useAuthStore((s) => s.accessToken);

  /**
   * WS 인스턴스 생성
   * - 렌더링마다 새로 만들면 구독/연결이 꼬일 수 있어서 useMemo로 고정
   * - accessToken, roomId가 바뀌면 다른 연결로 판단하여 재생성
   */
  const ws = useMemo(() => {
    // 토큰이 없으면 연결 X
    if (!accessToken) return null;
    // 연결 비활성화 시 연결 X
    if (!enabled) return null;

    const client = createStompClient({
      accessToken,
      onError,
      onConnect: () => {
        // 팀룸 구독
        client.subscribe(`/sub/room/${teamRoomId}`, (msg) => {
          if (!msg.json) return;
          onRoomMessage?.(msg.json);
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
  }, [accessToken, enabled, teamRoomId, onError, onRoomMessage]);

  // WS 연결/해제
  useEffect(() => {
    if (!ws) return;

    ws.connect();

    return () => {
      ws.disconnect();
    };
  }, [ws]);

  return ws;
}
