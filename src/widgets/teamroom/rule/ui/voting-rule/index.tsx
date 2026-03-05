import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { useSubmitRuleVote } from '@/entities/rule/hooks/useRule';
import TopBar from '@/shared/ui/header/TopBar';
import RuleVotingNotice from '@/widgets/teamroom/rule/ui/voting-rule/RuleVotingNotice';
import VotingRule from '@/widgets/teamroom/rule/ui/voting-rule/VotingRule';

interface Props {
  onFinish: () => void;
}

export default function RuleVotingScreen({ onFinish }: Props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const step = Number(searchParams.get('step')) || 0;
  const [voteResult, setVoteResult] = useState<(boolean | null)[]>(
    Array(10).fill(null),
  );

  const { mutateAsync, isPending } = useSubmitRuleVote(id!);

  useEffect(() => {
    if (voteResult.length === 0 && step > 1) {
      navigate(`?step=0`);
    }
  }, [navigate, step, voteResult.length]);

  const onStart = () => navigate(`?step=1`);

  const onBack = () => {
    if (step === 0) navigate(`/teamroom/${id}`);
    else navigate(`?step=${step - 1}`);
  };

  const handleVote = async (vote: boolean) => {
    if (step === 10) {
      const finalVoteResult = [...voteResult];
      finalVoteResult[step - 1] = vote;
      if (finalVoteResult.includes(null)) {
        alert('모든 항목에 투표해야 합니다.');
        navigate(`?step=${finalVoteResult.indexOf(null) + 1}`);
        return;
      }

      try {
        // 모든 투표 결과를 비동기로 서버에 제출
        await Promise.all(
          finalVoteResult.map((v, index) =>
            mutateAsync({ ruleId: index + 1, agreement: v as boolean }),
          ),
        );
        onFinish();
      } catch (error) {
        console.error('투표 제출 중 오류 발생:', error);
        alert('투표 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
    } else {
      setVoteResult((prev) => {
        const newVotes = [...prev];
        newVotes[step - 1] = vote;
        return newVotes;
      });
      navigate(`?step=${step + 1}`);
    }
  };

  if (isPending) {
    return <p>투표를 제출하는 중입니다...</p>;
  }

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
