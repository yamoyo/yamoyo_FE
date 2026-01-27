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

  openCalendarModal: (options) =>
    set({
      modal: {
        type: 'calendar',
        options,
      },
    }),

  openCharacterModal: (options) =>
    set({
      modal: {
        type: 'character',
        options,
      },
    }),

  closeModal: () => set({ modal: null }),
}));
