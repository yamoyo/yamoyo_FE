import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import type { LeaderGameMessage } from '@/entities/leader-game/api/ws-types';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
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
  const { pathname } = useLocation();

  const accessToken = useAuthStore((s) => s.accessToken);
  const workflow = useLeaderSelectionStore((s) => s.workflow);

  const isLeaderGameRoute = pathname.includes('/leader-game');

  const shouldConnect =
    Boolean(id) &&
    Boolean(accessToken) &&
    (isLeaderGameRoute ||
      workflow === 'PENDING' ||
      workflow === 'LEADER_SELECTION');

  const ws: WsClient | null = useMemo(() => {
    if (!accessToken) return null;

    return createStompClient({
      accessToken,
      onError: (err) => console.error('WebSocket 오류 발생:', err),
    });
  }, [accessToken]);

  // WebSocket 연결 상태 관리
  const connectedRef = useRef(false);

  // shouldConnect 변경 시 연결/해제 처리
  useEffect(() => {
    if (!ws) return;

    if (shouldConnect && !connectedRef.current) {
      ws.connect();
      connectedRef.current = true;
    }

    if (!shouldConnect && connectedRef.current) {
      ws.disconnect();
      connectedRef.current = false;
    }

    return () => {
      if (connectedRef.current) {
        ws.disconnect();
        connectedRef.current = false;
      }
    };
  }, [ws, shouldConnect]);

  // 공통 구독(/sub/room/{id})도 shouldConnect일 때만 등록
  const unsubRoomRef = useRef<null | (() => void)>(null);

  // 팀룸 메시지 수신 처리
  const onRoom = useCallback((msg: LeaderGameMessage) => {
    emitTeamRoomWsMessage(msg);
  }, []);

  useEffect(() => {
    if (!ws || !id || !shouldConnect) return;

    unsubRoomRef.current?.();

    unsubRoomRef.current = ws.subscribe<LeaderGameMessage>(
      `/sub/room/${id}`,
      (m) => {
        if (!m.json) return;
        onRoom(m.json);
      },
    );

    return () => {
      unsubRoomRef.current?.();
      unsubRoomRef.current = null;
    };
  }, [ws, id, shouldConnect, onRoom]);

  return (
    <TeamRoomWsClientContext.Provider value={shouldConnect ? ws : null}>
      <Outlet />
    </TeamRoomWsClientContext.Provider>
  );
}
