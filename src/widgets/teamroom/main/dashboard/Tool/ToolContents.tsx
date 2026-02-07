import { useMemo } from 'react';

import type { GetConfirmedTools } from '@/entities/setup/tool/api/tool-dto';
import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import type { ToolId } from '@/entities/teamroom/setup/tool/model/types';
import ContentsHeader from '@/widgets/teamroom/main/ui/ContentsHeader';
import ToolItems from '@/widgets/teamroom/setup/tool/ui/vote-tool/ui/ToolItems';

const sections = [
  {
    key: 'communication' as const,
    text: '커뮤니케이션',
    categoryId: TOOL_CONTENTS[0].categoryId,
    tools: TOOL_CONTENTS[0].tools,
  },
  {
    key: 'document' as const,
    text: '문서',
    categoryId: TOOL_CONTENTS[1].categoryId,
    tools: TOOL_CONTENTS[1].tools,
  },
];

interface Props {
  confirmedToolsData: GetConfirmedTools;
}

export default function ToolContents({ confirmedToolsData }: Props) {
  const selectedByCategoryId = useMemo(() => {
    const map = new Map<number, Set<number>>();
    for (const c of confirmedToolsData.confirmedTools) {
      map.set(c.categoryId, new Set(c.confirmedToolIds));
    }
    return map;
  }, [confirmedToolsData]);

  const getSelectedToolIds = (categoryId: number): ToolId[] => {
    const confirmedSet =
      selectedByCategoryId.get(categoryId) ?? new Set<number>();

    return (
      TOOL_CONTENTS.find((c) => c.categoryId === categoryId)
        ?.tools.filter((t) => confirmedSet.has(t.toolId))
        .map((t) => t.id) ?? []
    );
  };

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.key} className="space-y-4">
          <ContentsHeader id="tool" text={section.text} />
          <ToolItems
            tools={section.tools}
            selectedTools={getSelectedToolIds(section.categoryId)}
          />
        </div>
      ))}
    </div>
  );
}
