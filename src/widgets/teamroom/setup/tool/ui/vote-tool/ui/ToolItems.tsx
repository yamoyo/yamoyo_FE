import { Tools } from '@/entities/teamroom/setup/tool/model/types';
import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  tools: readonly Tools[];
  selectedTools?: number[];
  handleToolToggle?: (toolId: number) => void;
}

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
            handleToolToggle
              ? 'cursor-pointer blockMobileHover:hover:bg-bg-secondary_2 blockMobileHover:hover:text-tx-default_black'
              : 'cursor-default',
          )}
          onClick={() => handleToolToggle && handleToolToggle(tool.id)}
        >
          <img
            src={`/assets/tool/${tool.slug}.png`}
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
