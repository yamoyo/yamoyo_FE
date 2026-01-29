import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  type: 'LEADER' | 'PASS';
}

export default function ResultButton({ type }: Props) {
  const isLeader = type === 'LEADER';

  return (
    <div className="flex min-w-[64px] justify-center overflow-x-visible">
      <div
        style={{
          backgroundImage: `url(${
            isLeader
              ? '/assets/game/ladder/button-bg-yellow-square.svg'
              : '/assets/game/ladder/button-bg-white.png'
          })`,
          WebkitTextStrokeColor: '#171719',
          WebkitTextStrokeWidth: '0.7px',
        }}
        className={cn(
          'flex items-center justify-center bg-contain bg-center bg-no-repeat',
          isLeader
            ? 'body-g2 text-te-default_black h-[72px] min-w-[72px]'
            : 'body-g4 text-te-default_black h-10 w-[56px]',
        )}
      >
        {isLeader ? (
          <span className="whitespace-pre-line text-center">
            팀장{'\n'}당첨
          </span>
        ) : (
          <span className="text-center leading-[1]">통과</span>
        )}
      </div>
    </div>
  );
}
