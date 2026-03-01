import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import { proposalTools } from '@/entities/tool/api/tool-api';
import { useConfirmedTools } from '@/entities/tool/hooks/useTool';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import ToolItems from '@/widgets/teamroom/tool/ui/vote-tool/ui/ToolItems';

export default function ToolProposalPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teamRoomId = id;
  const category = searchParams.get('category') as 'communication' | 'document';

  const [selectedToolIds, setSelectedToolIds] = useState<number[]>([]);

  const { data, isLoading } = useConfirmedTools(teamRoomId!);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!teamRoomId || !category || !data) {
    return <div>유효하지 않은 접근입니다.</div>;
  }

  const confirmedToolIds =
    data.confirmedTools.find(
      (c) => c.categoryId === (category === 'communication' ? 1 : 2),
    )?.confirmedToolIds ?? [];

  const tools = TOOL_CONTENTS.find(
    (c) => c.categoryId === (category === 'communication' ? 1 : 2),
  );

  const handleToolToggle = (toolId: number) => {
    setSelectedToolIds((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    );
  };

  const navigateToDashboard = () => {
    navigate('/teamroom/' + teamRoomId, { replace: true });
  };

  const handleProposal = async () => {
    if (selectedToolIds.length === 0) {
      alert('요청을 원하는 협업툴을 선택해주세요.');
      return;
    }

    try {
      await proposalTools(teamRoomId, {
        categoryId: category === 'communication' ? 1 : 2,
        toolIds: selectedToolIds,
      });
      alert('협업툴 요청이 제출되었습니다.');
      navigateToDashboard();
    } catch (error) {
      console.error(error);
      alert('협업툴 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <TopBar title="협업툴 요청" onBack={navigateToDashboard} />
      <div className="flex flex-col overflow-y-hidden px-6 pb-[60px] pt-8">
        <h1 className="text-title-2 text-tx-default">
          팀장에게 제안할 툴을 선택해주세요.
        </h1>
        <p className="mt-1 text-body-5 text-tx-default_2">
          팀장의 확인 후 여부가 결정됩니다.
        </p>
        <div className="mb-8 mt-6 flex-grow overflow-y-auto">
          <ToolItems
            disabledTools={confirmedToolIds}
            tools={tools?.tools ?? []}
            selectedTools={selectedToolIds}
            handleToolToggle={handleToolToggle}
          />
        </div>
        <BottomButton text="요청하기" onClick={handleProposal} />
      </div>
    </div>
  );
}
