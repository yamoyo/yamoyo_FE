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

export interface GuideModalOptions {
  title: string;
  children: React.ReactNode;
}

/** 현재 활성화된 모달의 상태를 나타내는 타입 */
export type ActiveModal =
  | { type: 'choice'; options: ChoiceModalOptions }
  | { type: 'calendar'; options: CalendarModalOptions }
  | { type: 'character'; options: CharacterModalOptions }
  | { type: 'teamroom-created'; options: TeamRoomCreatedModalOptions }
  | { type: 'guide'; options: GuideModalOptions }
  | null;

export interface ModalStore {
  modal: ActiveModal;
  /**
   * 두 개의 액션 버튼을 제공하는 모달
   *
   * @param options 모달 구성 옵션
   * @param options.title        모달 제목 (필수)
   * @param options.description  모달 설명 (필수)
   * @param options.leftLabel    왼쪽 버튼 라벨 (필수)
   * @param options.rightLabel   오른쪽 버튼 라벨 (필수)
   *
   * @param options.onClickLeftBtn   왼쪽 버튼 클릭 핸들러 (선택)
   * - 미지정 시: 기본 동작으로 모달을 닫습니다.
   *
   * @param options.onClickRightBtn  오른쪽 버튼 클릭 핸들러 (필수)
   *
   * @param options.density 모달 내부 상하 패딩 (선택)
   * - 'comfortable': 30px
   * - 'compact': 22px (기본값)
   *
   * @param options.rightBtnClassName 오른쪽 버튼에 추가로 적용할 클래스명 (선택)
   */
  openChoiceModal: (options: ChoiceModalOptions) => void;
  openCalendarModal: (options: CalendarModalOptions) => void;
  /**
   * 캐릭터 일러스트가 포함된 모달
   *
   * @param options 모달 구성 옵션
   * @param options.title     모달 제목 (필수)
   * @param options.subTitle  모달 부제목/설명 (필수)
   *
   * 버튼 옵션(둘 중 하나만 가능)
   * - 버튼 있음:  { buttonText: string; onClick: () => void }
   * - 버튼 없음:  { buttonText?: never; onClick?: never }
   *
   * 캐릭터 옵션(둘 중 하나만 가능)
   * - PINK_CHARACTER: { type: 'PINK_CHARACTER'; characterId?: never }
   * - CROWN:          { type: 'CROWN'; characterId: number }
   */
  openCharacterModal: (options: CharacterModalOptions) => void;
  openTeamRoomCreatedModal: (options: TeamRoomCreatedModalOptions) => void;
  openGuideModal: (options: GuideModalOptions) => void;
  closeModal: () => void;
}
