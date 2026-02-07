import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TeamState {
  selectedTeamId: number | null;
  setSelectedTeamId: (id: number | null) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      selectedTeamId: null,
      setSelectedTeamId: (id) => set({ selectedTeamId: id }),
    }),
    {
      name: 'yamoyo-team',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedTeamId: state.selectedTeamId,
      }),
    },
  ),
);
