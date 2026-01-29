import { create } from 'zustand';
import { DEFAULT_TEAMROOM_IMAGE_ID } from '@/shared/constants/teamroom-images';

interface TeamRoomCreateData {
  name: string;
  description: string;
  bannerId: string;
  deadlineDate: string;
}

interface TeamRoomCreateStore {
  createData: TeamRoomCreateData | null;
  setCreateData: (data: TeamRoomCreateData) => void;
  updateCreateData: (data: Partial<TeamRoomCreateData>) => void;
  clearCreateData: () => void;
}

const DEFAULT_CREATE_DATA: TeamRoomCreateData = {
  name: '',
  description: '',
  bannerId: DEFAULT_TEAMROOM_IMAGE_ID,
  deadlineDate: '',
};

export const useTeamRoomCreateStore = create<TeamRoomCreateStore>((set) => ({
  createData: null,
  setCreateData: (data) => set({ createData: data }),
  updateCreateData: (data) =>
    set((state) => ({
      createData: { ...(state.createData ?? DEFAULT_CREATE_DATA), ...data },
    })),
  clearCreateData: () => set({ createData: null }),
}));
