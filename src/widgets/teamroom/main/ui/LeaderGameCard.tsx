import BottomButton from '@/shared/ui/button/BottomButton';

interface LeaderGameCardProps {
  onStart: () => void;
  disabled?: boolean;
}

export default function LeaderGameCard({
  onStart,
  disabled,
}: LeaderGameCardProps) {
  return (
    <section
      className="mx-auto flex h-[220px] w-full max-w-[342px] flex-col items-center gap-5 rounded-[12px] border-2"
      style={{
        borderColor: 'var(--bg-bg_card, #3D4366)',
        background:
          'radial-gradient(395.32% 169.68% at 50% 53.7%, rgba(129, 103, 196, 0.38) 0%, rgba(53, 62, 117, 0.25) 52.99%, rgba(47, 52, 83, 0.77) 100%)',
      }}
    >
      <div className="mt-4 flex w-full flex-col items-start px-5">
        <span className="text-body-1 text-tx-default">팀장 정하기</span>
        <span className="text-caption-1 text-tx-default_4">
          팀원이 모이면 팀장 정하기 게임이 시작됩니다.
        </span>
      </div>
      <img
        src="/assets/character/char-crown.png"
        width={78}
        height={56}
        alt=""
      />
      <BottomButton
        text="START"
        onClick={onStart}
        disabled={disabled}
        className="h-12 w-[302px] gap-[10px] bg-bg-secondary_2 px-[80px] py-[16px] font-galmuri-11 text-[17px] font-bold text-tx-default_black flex-center disabled:bg-tx-default_5 disabled:text-tx-default_4"
      />
    </section>
  );
}
