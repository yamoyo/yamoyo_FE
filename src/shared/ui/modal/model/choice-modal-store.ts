import { create } from 'zustand';
import { ModalStore } from './types';

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,

  openChoiceModal: (options) =>
    set({
      modal: {
        type: 'choice',
        options,
      },
    }),

  closeModal: () => set({ modal: null }),
}));
