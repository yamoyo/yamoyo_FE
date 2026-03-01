import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import { useSubmitAllToolVotes } from '@/entities/tool/hooks/useTool';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import StepTitle from '@/shared/ui/tab/StepTitle';
import ToolItems from '@/widgets/teamroom/tool/ui/vote-tool/ui/ToolItems';

interface Props {
  onFinish: () => void;
}

type SelectedByCategoryKey = Record<string, number[]>;

export default function VotingTool({ onFinish }: Props) {
  const { id } = useParams<{ id: string }>();
  const openChoiceModal = useModalStore((s) => s.openChoiceModal);

  const submitMutation = useSubmitAllToolVotes(id ?? '');

  const [step, setStep] = useState(0);
  const current = TOOL_CONTENTS[step];

  // 카테고리별 선택 상태
  const [selectedByCategory, setSelectedByCategory] =
    useState<SelectedByCategoryKey>(() =>
      Object.fromEntries(TOOL_CONTENTS.map((c) => [c.key, []])),
    );

  // 현재 step의 선택 목록
  const selectedTools = selectedByCategory[current.key] ?? [];

  const handleToolToggle = (toolId: number) => {
    setSelectedByCategory((prev) => {
      const prevSelected = prev[current.key] ?? [];
      const nextSelected = prevSelected.includes(toolId)
        ? prevSelected.filter((t) => t !== toolId)
        : [...prevSelected, toolId];

      return { ...prev, [current.key]: nextSelected };
    });
  };

  const isLastStep = step === TOOL_CONTENTS.length - 1;

  // 제출 가능 조건: 모든 카테고리 최소 1개 이상
  const canSubmit = useMemo(() => {
    return TOOL_CONTENTS.every(
      (c) => (selectedByCategory[c.key]?.length ?? 0) >= 1,
    );
  }, [selectedByCategory]);

  const handleNext = () => {
    if (!isLastStep) {
      setStep((prev) => prev + 1);
      return;
    }

    openChoiceModal({
      title: '투표하시겠습니까?',
      description: '투표 이후 수정/삭제가 불가능합니다.',
      leftLabel: '취소',
      rightLabel: '확인',
      density: 'comfortable',
      rightBtnClassName: 'bg-bg-primary',
      onClickRightBtn: () => {
        const toolVotes = TOOL_CONTENTS.map((category) => {
          const selected = selectedByCategory[category.key] ?? [];

          return {
            categoryId: category.categoryId,
            toolIds: category.tools
              .filter((t) => selected.includes(t.id))
              .map((t) => t.id),
          };
        });

        submitMutation.mutate(
          { toolVotes },
          {
            onSuccess: () => {
              onFinish();
            },
          },
        );
      },
    });
  };

  return (
    <>
      <TopBar title="협업툴 설정" />
      <div className="mt-5 flex flex-col gap-6 px-6 pb-12">
        <StepTitle
          step={step + 1}
          totalSteps={TOOL_CONTENTS.length}
          title={current.title}
          description={current.description}
        />

        <ToolItems
          tools={current.tools}
          selectedTools={selectedTools}
          handleToolToggle={handleToolToggle}
        />

        {isLastStep && !canSubmit && (
          <p className="text-body-6 text-tx-default_2">
            모든 카테고리에서 최소 1개 이상 선택해야 제출할 수 있어요.
          </p>
        )}

        <BottomButton
          className="mt-[34px]"
          text={isLastStep ? '선택완료' : '다음'}
          onClick={handleNext}
          disabled={isLastStep ? !canSubmit || submitMutation.isPending : false}
        />
      </div>
    </>
  );
}
