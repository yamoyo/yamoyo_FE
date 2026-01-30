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

export interface TeamRoomCreatedModalOptions {
  teamRoomId: string;
  inviteLink: string;
}

/** 현재 활성화된 모달의 상태를 나타내는 타입 */
export type ActiveModal =
  | { type: 'choice'; options: ChoiceModalOptions }
  | { type: 'calendar'; options: CalendarModalOptions }
  | { type: 'character'; options: CharacterModalOptions }
  | { type: 'teamroom-created'; options: TeamRoomCreatedModalOptions }
  | null;

export interface ModalStore {
  modal: ActiveModal;
  openChoiceModal: (options: ChoiceModalOptions) => void;
  openCalendarModal: (options: CalendarModalOptions) => void;
  /**
   * 캐릭터가 있는 모달을 띄우는 함수
   *
   * options 구성:
   * - title: string (필수) 모달 제목
   * - subTitle: string (필수) 모달 부제목/설명
   *
   * 버튼 옵션(둘 중 하나):
   * - 버튼 있음: { buttonText: string; onClick: () => void }
   * - 버튼 없음: { buttonText?: never; onClick?: never }
   *
   * 캐릭터 옵션(둘 중 하나):
   * - PINK_CHARACTER: { type: 'PINK_CHARACTER'; characterId?: never }
   * - CROWN: { type: 'CROWN'; characterId: number }
   *
   * @param options CharacterModalOptions
   * @returns void
   */
  openCharacterModal: (options: CharacterModalOptions) => void;
  openTeamRoomCreatedModal: (options: TeamRoomCreatedModalOptions) => void;
  closeModal: () => void;
}
