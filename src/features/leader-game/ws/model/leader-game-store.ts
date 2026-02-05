import { create } from 'zustand';

import type { PhaseChangeMessage } from '@/entities/leader-game/api/ws-types';
import type {
  TeamMemberRole,
  TeamRoomWorkflow,
} from '@/entities/teamroom/api/teamroom-dto';
import type { Phase } from '@/widgets/teamroom/leader-game/model/types';

type PhasePayload = PhaseChangeMessage['payload'];

interface LeaderSelectionState {
  // 공통 컨텍스트
  teamRoomId: number | string | null;
  role: TeamMemberRole | null;

  // 팀장 정하기 게임 상태
  phase: Phase;
  payload: PhasePayload | null;

  // ws 연결 가드용 상태
  workflow: TeamRoomWorkflow | null;

  // setters
  setRole: (role: TeamMemberRole | null) => void;
  setPhase: (phase: Phase) => void;
  setPayload: (payload: PhasePayload | null) => void;
  setWorkflow: (workflow: TeamRoomWorkflow | null) => void;

  // helpers
  clearPayload: () => void;
  reset: () => void;

  // ws 연결 조건을 store에서 바로 계산
  canConnectOnMain: () => boolean;
}

const initialState = {
  teamRoomId: null,
  role: null,
  phase: null as Phase,
  payload: null as PhasePayload | null,
  workflow: null as TeamRoomWorkflow | null,
};

export const useLeaderSelectionStore = create<LeaderSelectionState>(
  (set, get) => ({
    ...initialState,

    setRole: (role) => set({ role }),
    setPhase: (phase) => set({ phase }),
    setPayload: (payload) => set({ payload }),
    setWorkflow: (workflow) => set({ workflow }),

    clearPayload: () => set({ payload: null }),

    reset: () => set(initialState),

    canConnectOnMain: () => {
      const wf = get().workflow;
      // PENDING, LEADER_SELECTION 상태에서만 연결 허용
      return wf === 'PENDING' || wf === 'LEADER_SELECTION';
    },
  }),
);
