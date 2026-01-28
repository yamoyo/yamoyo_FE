import CalendarModal from './CalendarModal';
import CharacterModal from './character-modal/CharacterModal';
import ChoiceModal from './ChoiceModal';
import TeamRoomCreatedModal from './TeamRoomCreatedModal';
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
    case 'teamroom-created':
      return <TeamRoomCreatedModal {...modal.options} />;
    default:
      return null;
  }
}
