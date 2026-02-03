import { useState } from 'react';

import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import { ToolId } from '@/entities/teamroom/setup/tool/model/types';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import StepTitle from '@/shared/ui/tab/StepTitle';

import ToolItems from './ui/ToolItems';

interface Props {
  onFinish: () => void;
}

export default function VotingTool({ onFinish }: Props) {
  const openChoiceModal = useModalStore((s) => s.openChoiceModal);

  const [step, setStep] = useState(0);
  const { title, description, tools } = TOOL_CONTENTS[step];
  const [selectedTools, setSelectedTools] = useState<ToolId[]>([]);

  const handleToolToggle = (toolId: ToolId) => {
    setSelectedTools((prevSelected) => {
      if (prevSelected.includes(toolId)) {
        return prevSelected.filter((id) => id !== toolId);
      } else {
        return [...prevSelected, toolId];
      }
    });
  };

  const handleNext = () => {
    if (step < TOOL_CONTENTS.length - 1) {
      setStep((prevStep) => prevStep + 1);
    } else {
      // TODO: API
      openChoiceModal({
        title: '투표하시겠습니까?',
        description: '함께한 팀원들을 투표 후 수정/삭제가 불가능합니다.',
        leftLabel: '취소',
        rightLabel: '확인',
        onClickRightBtn: onFinish,
        density: 'comfortable',
        rightBtnClassName: 'bg-bg-primary',
      });
    }
  };

  return (
    <>
      <TopBar title="협업툴 설정" />
      <div className="mt-5 flex flex-col gap-6 px-6 pb-12">
        <StepTitle
          step={step + 1}
          totalSteps={TOOL_CONTENTS.length}
          title={title}
          description={description}
        />
        <ToolItems
          tools={tools}
          selectedTools={selectedTools}
          handleToolToggle={handleToolToggle}
        />
        <BottomButton
          className="mt-[34px]"
          text={step < TOOL_CONTENTS.length - 1 ? '다음' : '선택완료'}
          onClick={handleNext}
        />
      </div>
    </>
  );
}
