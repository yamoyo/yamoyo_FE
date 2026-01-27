import { CharacterModalOptions } from '../character-modal/model/types';

type ModalDensity = 'comfortable' | 'compact';

export interface ChoiceModalOptions {
  title: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
  onClickLeftBtn?: () => void;
  onClickRightBtn: () => void;
  density?: ModalDensity;
  rightBtnClassName?: string;
}

export interface CalendarModalOptions {
  initialDate?: Date;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}

/** 현재 활성화된 모달의 상태를 나타내는 타입 */
export type ActiveModal =
  | { type: 'choice'; options: ChoiceModalOptions }
  | { type: 'calendar'; options: CalendarModalOptions }
  | { type: 'character'; options: CharacterModalOptions }
  // 다른 모달 추가하려면 아래와 같이 추가
  // | { type: 'info', options: InfoModalOptions }
  | null;

export interface ModalStore {
  modal: ActiveModal;
  openChoiceModal: (options: ChoiceModalOptions) => void;
  openCalendarModal: (options: CalendarModalOptions) => void;
  openCharacterModal: (options: CharacterModalOptions) => void;
  closeModal: () => void;
}
