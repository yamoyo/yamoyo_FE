import ContentsHeader from '../../ui/ContentsHeader';
import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import ToolItems from '@/widgets/teamroom/setup/tool/ui/vote-tool/ui/ToolItems';

export default function ToolContents() {
  const sections = [
    {
      key: 'communication' as const,
      text: '커뮤니케이션',
      tools: TOOL_CONTENTS[0].tools,
    },
    {
      key: 'document' as const,
      text: '문서',
      tools: TOOL_CONTENTS[1].tools,
    },
  ];

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.key} className="space-y-4">
          <ContentsHeader id="tool" text={section.text} />
          <ToolItems tools={section.tools} />
        </div>
      ))}
    </div>
  );
}
