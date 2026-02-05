import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { PhaseChangeMessage } from '@/entities/leader-game/api/ws-types';
import { TeamMemberRole } from '@/entities/teamroom/api/teamroom-dto';
import type { Phase } from '@/widgets/teamroom/leader-game/model/types';

interface LeaderGameState {
  teamRoomId: number | string | null;
  role: TeamMemberRole | null;
  phase: Phase;
  payload: PhaseChangeMessage['payload'] | null;

  setTeamRoomId: (teamRoomId: number | string | null) => void;
  setRole: (role: TeamMemberRole | null) => void;
  setPhase: (phase: Phase) => void;
  setPayload: (payload: PhaseChangeMessage['payload'] | null) => void;

  clearPayload: () => void;
  reset: () => void;
}

const initialState = {
  teamRoomId: null,
  phase: null,
  role: null,
  payload: null as PhaseChangeMessage['payload'] | null,
};

export const useLeaderGameStore = create<LeaderGameState>()(
  persist(
    (set) => ({
      ...initialState,

      setRole: (role) => set({ role }),
      setTeamRoomId: (teamRoomId) => set({ teamRoomId }),
      setPhase: (phase) => set({ phase }),
      setPayload: (payload) => set({ payload }),

      clearPayload: () => set({ payload: null }),

      reset: () => {
        set(initialState);
        // localStorage도 같이 비우고 싶으면 아래도 같이 써도 됨:
        // useLeaderGameStore.persist.clearStorage();
      },
    }),
    {
      name: 'leader-game-store', // localStorage key
      storage: createJSONStorage(() => localStorage),

      /**
       * 저장할 필드만 고르기 (필요 없으면 삭제해도 됨)
       * - 보통 volunteerPayload는 휘발성이라 저장 안 하는 게 안전할 때가 많음
       */
      partialize: (s) => ({
        teamRoomId: s.teamRoomId,
        role: s.role,
        phase: s.phase,
        payload: s.payload,
      }),
    },
  ),
);
