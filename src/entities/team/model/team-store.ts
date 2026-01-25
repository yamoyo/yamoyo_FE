import { create } from 'zustand';

interface TeamState {
  selectedTeamId: number | null;
  setSelectedTeamId: (id: number | null) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  selectedTeamId: null,
  setSelectedTeamId: (id) => set({ selectedTeamId: id }),
}));
