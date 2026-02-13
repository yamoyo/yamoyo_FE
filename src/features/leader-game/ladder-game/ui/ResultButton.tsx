import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  type: 'LEADER' | 'PASS';
}

export default function ResultButton({ type }: Props) {
  const isLeader = type === 'LEADER';
  const backgroundImage = isLeader
    ? '/assets/game/ladder/button-bg-yellow-square.svg'
    : '/assets/game/ladder/button-bg-white.png';
  const sizeClasses = isLeader ? 'h-[72px] min-w-[72px]' : 'h-10 w-[56px]';
  const textClasses = isLeader
    ? 'body-g2 text-te-default_black whitespace-pre-line'
    : 'body-g4 text-te-default_black';
  const label = isLeader ? '팀장\n당첨' : '통과';

  return (
    <div className="flex min-h-[72px] min-w-[72px] justify-center overflow-x-visible">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          WebkitTextStrokeColor: '#171719',
          WebkitTextStrokeWidth: '0.7px',
        }}
        className={cn(
          'bg-contain bg-center bg-no-repeat flex-center',
          sizeClasses,
        )}
      >
        <span className={cn(textClasses, 'text-center')}>{label}</span>
      </div>
    </div>
  );
}
