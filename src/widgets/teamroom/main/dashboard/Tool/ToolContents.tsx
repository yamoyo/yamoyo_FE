import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import type { GetConfirmedTools } from '@/entities/tool/api/tool-dto';
import ContentsHeader from '@/widgets/teamroom/main/ui/ContentsHeader';
import ToolItems from '@/widgets/teamroom/tool/ui/vote-tool/ui/ToolItems';

interface Props {
  confirmedToolsData: GetConfirmedTools;
  teamRoomId: string | number;
  isReader: boolean;
}

export default function ToolContents({
  confirmedToolsData,
  teamRoomId,
  isReader,
}: Props) {
  const navigate = useNavigate();

  // 확정된 툴 ID를 카테고리별로 맵으로 저장
  // 예시: { 1 => Set(2, 3), 2 => Set(5) } 이런 형태
  const confirmedMap = useMemo(
    () =>
      new Map<number, Set<number>>(
        confirmedToolsData.confirmedTools.map((c) => [
          c.categoryId,
          new Set(c.confirmedToolIds),
        ]),
      ),
    [confirmedToolsData],
  );

  // 툴 카테고리별로 확정된 툴만 필터링하여 sections 생성
  const sections = useMemo(
    () =>
      TOOL_CONTENTS.map((content) => {
        const confirmedSet =
          confirmedMap.get(content.categoryId) ?? new Set<number>();

        const confirmedOnlyTools = content.tools.filter((t) =>
          confirmedSet.has(t.id),
        );

        return {
          key: content.key,
          text: content.key === 'communication' ? '커뮤니케이션' : '문서',
          categoryId: content.categoryId,
          tools: confirmedOnlyTools,
        } as const;
      }),
    [confirmedMap],
  );

  const handleProposalTools = (category: 'communication' | 'document') => {
    navigate(`/teamroom/${teamRoomId}/proposal-tool?category=${category}`);
  };

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.key} className="space-y-4">
          <ContentsHeader
            id="tool"
            text={section.text}
            onClickRightButton={() => handleProposalTools(section.key)}
            hideRightButton={isReader}
          />
          {
            // 확정된 툴이 없는 경우 안내 메시지 표시
            section.tools.length === 0 && (
              <p className="text-body-6 text-tx-default">
                확정된 협업툴이 없습니다.
              </p>
            )
          }
          <ToolItems tools={section.tools} />
        </div>
      ))}
    </div>
  );
}
