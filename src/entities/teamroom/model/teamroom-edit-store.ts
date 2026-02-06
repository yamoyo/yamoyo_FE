import { create } from 'zustand';

interface TeamRoomEditData {
  title: string;
  description: string;
  bannerImageId: number;
  deadline: string;
}

interface TeamRoomEditStore {
  editData: TeamRoomEditData | null;
  setEditData: (data: TeamRoomEditData) => void;
  updateEditData: (data: Partial<TeamRoomEditData>) => void;
  clearEditData: () => void;
}

export const useTeamRoomEditStore = create<TeamRoomEditStore>((set) => ({
  editData: null,
  setEditData: (data) => set({ editData: data }),
  updateEditData: (data) =>
    set((state) => ({
      editData: state.editData ? { ...state.editData, ...data } : null,
    })),
  clearEditData: () => set({ editData: null }),
}));
