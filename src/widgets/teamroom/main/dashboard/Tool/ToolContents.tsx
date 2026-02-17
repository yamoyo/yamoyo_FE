import { useMemo } from 'react';

import type { GetConfirmedTools } from '@/entities/setup/tool/api/tool-dto';
import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import ContentsHeader from '@/widgets/teamroom/main/ui/ContentsHeader';
import ToolItems from '@/widgets/teamroom/setup/tool/ui/vote-tool/ui/ToolItems';

interface Props {
  confirmedToolsData: GetConfirmedTools;
}

export default function ToolContents({ confirmedToolsData }: Props) {
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
          confirmedSet.has(t.toolId),
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

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.key} className="space-y-4">
          <ContentsHeader id="tool" text={section.text} />
          <ToolItems
            tools={section.tools}
            selectedTools={getSelectedToolIds(section.categoryId)}
          />
          <ToolItems tools={section.tools} />
        </div>
      ))}
    </div>
  );
}
