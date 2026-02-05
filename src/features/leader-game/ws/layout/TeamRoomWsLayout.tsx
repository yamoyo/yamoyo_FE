import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Outlet, useParams } from 'react-router-dom';

import type { LeaderGameMessage } from '@/entities/leader-game/api/ws-types';
import { emitTeamRoomWsMessage } from '@/features/leader-game/ws/model/ws-bus';
import { useAuthStore } from '@/shared/api/auth/store';
import { createStompClient } from '@/shared/api/ws/stompClient';
import type { WsClient } from '@/shared/api/ws/types';

type Handler = (msg: LeaderGameMessage) => void;

export type TeamRoomWsContext = {
  subscribe: (handler: Handler) => () => void;
};

const TeamRoomWsClientContext = createContext<WsClient | null>(null);
export const useTeamRoomWsClient = () => useContext(TeamRoomWsClientContext);

/** 팀장 정하기 게임을 위한 WebSocket 레이아웃
 *
 * - /sub/room/${roomId}를 팀룸과 게임 페이지에서 공통으로 구독하기 위해 만듦
 *
 */
export default function TeamRoomWsLayout() {
  const { id } = useParams<{ id: string }>();
  const accessToken = useAuthStore((s) => s.accessToken);

  const ws: WsClient | null = useMemo(() => {
    if (!accessToken) return null;

    return createStompClient({
      accessToken,
      onError: (err) => console.error('WebSocket 오류 발생:', err),
    });
  }, [accessToken]);

  // ws 연결/해제
  useEffect(() => {
    if (!ws) return;
    ws.connect();
    return () => ws.disconnect();
  }, [ws]);

  // 구독 해제 함수 보관용 ref
  const unsubRef = useRef<null | (() => void)>(null);

  // 팀룸 메시지 수신 처리
  const onRoom = useCallback((msg: LeaderGameMessage) => {
    emitTeamRoomWsMessage(msg);
  }, []);

  useEffect(() => {
    if (!ws || !id) return;

    // 이전 구독 해제
    unsubRef.current?.();

    unsubRef.current = ws.subscribe<LeaderGameMessage>(
      `/sub/room/${id}`,
      (m) => {
        if (!m.json) return;
        onRoom(m.json);
      },
    );

    return () => {
      unsubRef.current?.();
      unsubRef.current = null;
    };
  }, [ws, id, onRoom]);

  return (
    <TeamRoomWsClientContext.Provider value={ws}>
      <Outlet />
    </TeamRoomWsClientContext.Provider>
  );
}
