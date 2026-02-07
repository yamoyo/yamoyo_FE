import { cn } from '@/shared/config/tailwind/cn';
import BottomButton from '@/shared/ui/button/BottomButton';

interface LeaderGameCardProps {
  onStart: () => void;
  isHost: boolean;
  isAllOnline: boolean;
}

export default function LeaderGameCard({
  onStart,
  isHost,
  isAllOnline,
}: LeaderGameCardProps) {
  const subTitle = isAllOnline
    ? isHost
      ? '모든 팀원이 온라인 상태입니다. 게임을 시작할 수 있습니다.'
      : '방장의 시작을 기다리고 있어요.'
    : '모든 팀원이 모이면 팀장 정하기 게임을 시작할 수 있습니다.';

  return (
    <section
      className={cn(
        'mx-6 flex w-full max-w-[342px] flex-col items-center gap-5 rounded-[12px] border-2',
        isHost ? 'py-4' : 'pb-7 pt-4',
      )}
      style={{
        borderColor: 'var(--bg-bg_card, #3D4366)',
        background:
          'radial-gradient(395.32% 169.68% at 50% 53.7%, rgba(129, 103, 196, 0.38) 0%, rgba(53, 62, 117, 0.25) 52.99%, rgba(47, 52, 83, 0.77) 100%)',
      }}
    >
      <div className="flex w-full flex-col items-start px-5">
        <span className="text-body-1 text-tx-default">팀장 정하기</span>
        <span className="text-caption-1 text-tx-default_4">{subTitle}</span>
      </div>
      <img
        src="/assets/character/char-crown.png"
        width={78}
        height={56}
        alt=""
      />
      {isHost && (
        <BottomButton
          text="START"
          onClick={onStart}
          disabled={!isAllOnline}
          className="h-12 w-[302px] gap-[10px] bg-bg-secondary_2 px-[80px] py-[16px] font-galmuri-11 text-[17px] font-bold text-tx-default_black flex-center disabled:bg-tx-default_5 disabled:text-tx-default_4"
        />
      )}
    </section>
  );
}
