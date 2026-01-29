import TopBar from '@/shared/ui/header/TopBar';

const subtractImg =
  'https://www.figma.com/api/mcp/asset/dd1ed688-30f1-4039-a622-c8b686c9ed69';

export default function LadderGame() {
  return (
    <div
      style={{
        backgroundImage: 'url(/assets/game/ladder/bg-ladder-game.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
      }}
      className="flex flex-1 flex-col"
    >
      <TopBar title="사다리게임" showBackButton={false} gameFont />

      <h1
        className="title-g outside-stroke mx-auto whitespace-pre-line text-tx-default"
        style={{ ['--stroke' as string]: '#4C5377' }}
      >
        {'예측 불허!\n가장 클래식한 운명의 복불복'}
      </h1>
      <div
        className="relative flex size-full flex-col content-stretch items-start gap-[10px] px-[16px] py-[12px]"
        data-name="ladder_leader"
        data-node-id="241:10940"
      >
        {/* Subtract (top-left) */}
        <div
          className="absolute left-0 top-0 size-[72px]"
          data-name="Subtract"
          data-node-id="I241:10940;415:75625"
        >
          <img
            alt=""
            className="block size-full max-w-none"
            src={subtractImg}
          />
        </div>

        {/* Text */}
        <div
          className="relative h-[48px] w-[40px] shrink-0 whitespace-pre-wrap font-['Galmuri14:Regular',sans-serif] text-[19px] not-italic leading-[normal] text-[color:var(--tx/default_black,#171719)]"
          data-node-id="I241:10940;415:75643"
        >
          <p className="mb-0">팀장</p>
          <p>당첨</p>
        </div>
      </div>
    </div>
  );
}
