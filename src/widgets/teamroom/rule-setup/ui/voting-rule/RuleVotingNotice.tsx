import BottomButton from '@/shared/ui/button/BottomButton';
import PixelStatusMessage from '@/shared/ui/display/PixelStatusMessage';

interface Props {
  onStart: () => void;
}

export default function RuleVotingNotice({ onStart }: Props) {
  return (
    <div className="flex flex-grow flex-col px-6">
      <PixelStatusMessage
        message={
          '아모요가 팀 규칙을 생성했어요\n재투표는 불가하니 신중히 선택해주세요.'
        }
        className="flex-grow translate-y-[-5vh]"
      />
      <BottomButton text="시작하기" onClick={onStart} />
    </div>
  );
}
