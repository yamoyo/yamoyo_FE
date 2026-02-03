import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBar from '@/shared/ui/header/TopBar';

import RuleVotingNotice from './RuleVotingNotice';
import VotingRule from './VotingRule';

export default function RuleVotingScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const navigate = useNavigate();

  // step: 0: 사전 안내
  const [step, setStep] = useState(0);

  const onBack = () => {
    if (step === 0) navigate(-1);
    else setStep((prev) => prev - 1);
  };
  const onStart = () => setStep(1);
  const handleVote = (vote: 'YES' | 'NO') => {
    if (step === 10) {
      onFinish();
    } else {
      // TODO: 투표 API 연동
      if (vote === 'YES') {
        // 좋아요 누른 경우 처리
      } else {
        // 싫어요 누른 경우 처리
      }
      setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <TopBar title="팀 규칙 설정" onBack={onBack} />

      <div className="flex flex-1 flex-col pb-12">
        {step === 0 ? (
          <RuleVotingNotice onStart={onStart} />
        ) : (
          <VotingRule step={step} handleVote={handleVote} />
        )}
      </div>
    </>
  );
}
