import CalendarModal from './CalendarModal';
import CharacterModal from './character-modal/CharacterModal';
import ChoiceModal from './ChoiceModal';
import { useModalStore } from './model/modal-store';

export default function ModalRoot() {
  const modal = useModalStore((s) => s.modal);
  if (!modal) return null;

  switch (modal.type) {
    case 'choice':
      return <ChoiceModal {...modal.options} />;
    case 'calendar':
      return <CalendarModal {...modal.options} />;
    case 'character':
      return <CharacterModal {...modal.options} />;
    // 다른 모달 추가하려면 아래와 같이 추가
    // case 'info':
    //   return <InfoModal {...modal.options} />;
    default:
      return null;
  }
}
