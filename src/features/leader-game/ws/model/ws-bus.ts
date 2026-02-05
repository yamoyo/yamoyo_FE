import type { LeaderGameMessage } from '@/entities/leader-game/api/ws-types';

const handlers = new Set<(msg: LeaderGameMessage) => void>();

/** 팀장 정하기 게임을 위한 WebSocket 메시지 버스
 *
 * - 여러 컴포넌트에서 WebSocket 메시지를 구독하고 처리할 수 있도록 함
 */
export function addTeamRoomWsHandler(h: (msg: LeaderGameMessage) => void) {
  handlers.add(h);
  return () => handlers.delete(h);
}

/** WS 메시지 bus에 메시지 발행 */
export function emitTeamRoomWsMessage(msg: LeaderGameMessage) {
  handlers.forEach((h) => h(msg));
}
