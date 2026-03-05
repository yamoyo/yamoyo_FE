import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import { proposalToolDecision } from '@/entities/tool/api/tool-api';
import { useToolProposalDetail } from '@/entities/tool/hooks/useTool';
import BottomButtonTwoOptions from '@/shared/ui/button/BottomButtonTwoOptions';
import TopBar from '@/shared/ui/header/TopBar';
import ToolItems from '@/widgets/teamroom/tool/ui/vote-tool/ui/ToolItems';

export default function ToolProposalDecisionPage() {
  const navigate = useNavigate();
  const { id, proposalId } = useParams();

  const {
    data: proposalDetail,
    isLoading,
    isError,
  } = useToolProposalDetail(Number(id), Number(proposalId));

  const proposalItems = useMemo(
    () =>
      TOOL_CONTENTS.find(
        (c) => c.categoryId === proposalDetail?.categoryId,
      )?.tools.find((t) => t.id === proposalDetail?.toolId),
    [proposalDetail],
  );

  const navigateToDashboard = useCallback(() => {
    navigate('/teamroom/' + id, { replace: true });
  }, [id, navigate]);

  const handleDecision = async (isApproved: boolean) => {
    if (!id || !proposalId) {
      alert('유효하지 않은 접근입니다.');
      navigateToDashboard();
      return;
    }

    try {
      await proposalToolDecision(id, proposalId, isApproved);
      alert(isApproved ? '제안이 승인되었습니다.' : '제안이 거절되었습니다.');
      navigateToDashboard();
    } catch (error) {
      console.error('Error processing proposal decision:', error);
      alert('승인/반려 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    if (!id || !proposalId) {
      alert('유효하지 않은 접근입니다.');
      navigateToDashboard();
    }
  }, [id, proposalId, navigateToDashboard]);

  if (isLoading) {
    return <div>협업툴 제안을 불러오고 있습니다.</div>;
  }

  if (isError || !proposalDetail || !proposalItems) {
    return <div>협업툴 제안을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <TopBar title="협업툴 설정" onBack={navigateToDashboard} />
      <div className="flex flex-1 flex-col px-6 pb-[60px] pt-8">
        <h1 className="text-title-2 text-tx-default">
          새로운 툴 제안이 도착했습니다.
        </h1>
        <p className="mt-1 text-body-5 text-tx-default_2">
          제안된 새로운 툴을 검토하고 도입 여부를 결정해 주세요.
        </p>
        <div className="mb-8 mt-6 flex-grow space-y-2">
          <p className="text-body-8 text-tx-default_2">
            제안한 팀원: {proposalDetail.proposerName}
          </p>
          <ToolItems tools={[proposalItems]} />
        </div>
        <BottomButtonTwoOptions
          leftText="싫어요"
          rightText="좋아요"
          onLeftClick={() => handleDecision(false)}
          onRightClick={() => handleDecision(true)}
        />
      </div>
    </>
  );
}
