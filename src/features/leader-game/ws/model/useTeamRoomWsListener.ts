import { useEffect } from 'react';

import type { LeaderGameMessage } from '@/entities/leader-game/api/ws-types';

import { addTeamRoomWsHandler } from './ws-bus';

export function useTeamRoomWsListener(
  handler: (msg: LeaderGameMessage) => void,
) {
  useEffect(() => addTeamRoomWsHandler(handler), [handler]);
}
