import BottomButton from '@/shared/ui/button/BottomButton';

interface MemberActionButtonsProps {
  onDelegateLeader: () => void;
  onExpelMember: () => void;
}

export default function MemberActionButtons({
  onDelegateLeader,
  onExpelMember,
}: MemberActionButtonsProps) {
  return (
    <section className="flex select-none gap-3 px-6" draggable="false">
      <BottomButton
        text="방장 위임"
        onClick={onDelegateLeader}
        className="shrink"
      />
      <BottomButton
        text="팀원 방출"
        onClick={onExpelMember}
        className="shrink bg-textfiled-line_error"
      />
    </section>
  );
}
