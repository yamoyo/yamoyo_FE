import BottomButtonTwoOptions from '@/shared/ui/button/BottomButtonTwoOptions';
import StepTitle from '@/shared/ui/tab/StepTitle';

const VOTE_CONTENTS = [
  {
    title: '응답 매너',
    description: '읽은 메시지에는 간단한 응답이라도 남겨요.',
    message: '연락을 읽고 씹지 않아요',
  },
  {
    title: '연락 가능 시간',
    description: '서로의 생활과 리듬을 존중하기 위한 규칙이에요.',
    message: '정해진 시간에만 연락해요',
  },
  {
    title: '회의 불참 공유',
    description: '최소 하루 전에는 공유해주세요.',
    message: '회의 불참은 최소 하루 전에 공유해요',
  },
  {
    title: '회의 지각 패널티',
    description: '회의 지각에는 패널티가 있어요.',
    message: '회의 지각 시 지각비 3000원을 부과해요',
  },
  {
    title: '질문 타이밍',
    description: '급한 요청으로 흐름이 끊기지 않게 해요.',
    message: '질문이나 요청은 수업 전에 전달해요',
  },
  {
    title: '회의 준비도',
    description: '안건을 미리 확인하고 들어와요.',
    message: '회의 전 안건을 미리 확인하고 참여해요',
  },
  {
    title: '개인 일정 존중',
    description: '변동 사항은 미리미리 공유해주세요.',
    message: '개인 일정은 미리 말해주세요.',
  },
  {
    title: '업무 요청 방식',
    description: '목적과 기한을 함께 전달해주세요.',
    message: '업무 요청은 목적과 기한을 함께 전달해요',
  },
  {
    title: '책임과 마감',
    description: '마감 일정은 스스로 관리하고 책임져요.',
    message: '본인이 맡은 일의 마감은 스스로 관리해요',
  },
  {
    title: '팀 내 분위기',
    description: '지적보다는 제안을 우선해요.',
    message: '감정적인 언행은 삼가해주세요',
  },
];

interface Props {
  step: number;
  handleVote: (vote: 'YES' | 'NO') => void;
}

export default function VotingRule({ step, handleVote }: Props) {
  const { title, description, message } = VOTE_CONTENTS[step - 1];

  return (
    <div className="flex flex-1 select-none flex-col items-center px-5 pt-[30px] text-tx-default">
      <StepTitle
        step={step}
        totalSteps={VOTE_CONTENTS.length}
        title={title}
        description={description}
      />
      <div className="relative mt-9 flex max-w-[326px] flex-1 flex-col items-end">
        <img
          src="/assets/rule/speech-bubble.png"
          alt="speech-bubble"
          className="w-full"
        />
        <p className="body-g3 absolute left-1/2 top-4 w-full -translate-x-1/2 text-center text-tx-default">
          {message}
        </p>
        <img
          className="mr-2.5 mt-5 w-[80px]"
          src={`/assets/character/char-${step}.png`}
        />
      </div>
      <BottomButtonTwoOptions
        leftText="싫어요"
        rightText="좋아요"
        onLeftClick={() => handleVote('NO')}
        onRightClick={() => handleVote('YES')}
      />
    </div>
  );
}
