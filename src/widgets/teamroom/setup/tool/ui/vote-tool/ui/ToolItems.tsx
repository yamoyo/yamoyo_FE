import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import { ToolId } from '@/entities/teamroom/setup/tool/model/types';
import { cn } from '@/shared/config/tailwind/cn';

type Props = { tools: (typeof TOOL_CONTENTS)[number]['tools'] } & (
  | {
      selectedTools: ToolId[];
      handleToolToggle: (toolId: ToolId) => void;
    }
  | {
      selectedTools?: never;
      handleToolToggle?: never;
    }
);

export default function ToolItems({
  tools,
  selectedTools,
  handleToolToggle,
}: Props) {
  return (
    <div className="space-y-6">
      {tools.map((tool) => (
        <button
          disabled={!handleToolToggle}
          key={tool.id}
          className={cn(
            'flex h-20 w-full items-center gap-2 rounded-xl pl-[30px] outline-none transition-colors',
            selectedTools && selectedTools.includes(tool.id)
              ? 'bg-bg-secondary_2 text-tx-default_black'
              : 'bg-bg-card text-tx-default',
            {
              'hover:bg-bg-secondary_2 hover:text-tx-default_black':
                !!handleToolToggle,
            },
          )}
          onClick={() => handleToolToggle && handleToolToggle(tool.id)}
        >
          <img
            src={`/assets/tool/${tool.id}.png`}
            alt={tool.name}
            className="h-[52px] w-[52px]"
          />
          <div className="space-y-1 text-start">
            <p className="text-body-3.9">{tool.name}</p>
            <p className="text-body-6">{tool.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
