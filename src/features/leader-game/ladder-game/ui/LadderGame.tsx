import { GameResultPayload } from '@/entities/leader-game/api/ws-types';
import LadderBoard from '@/features/leader-game/ladder-game/ui/LadderBoard';
import TopBar from '@/shared/ui/header/TopBar';

export default function LadderGame({
  gameResultPayload,
}: {
  gameResultPayload: GameResultPayload;
}) {
  // gameData가 null일 경우 이미 방장이 선정된 상태이므로 기본값으로 0 지정
  const teamLeaderIndex = gameResultPayload.gameData ? 1 : 0;

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/game/ladder/bg-ladder-game.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
      }}
      className="flex h-screen flex-col overflow-hidden"
    >
      <TopBar title="사다리게임" showBackButton={false} gameFont />

      <h1
        className="title-g outside-stroke mx-auto whitespace-pre-line text-tx-default"
        style={{ ['--stroke' as string]: '#4C5377' }}
      >
        {'예측 불허!\n가장 클래식한 운명의 복불복'}
      </h1>

      <LadderBoard
        teamLeaderIndex={teamLeaderIndex}
        gameResultPayload={gameResultPayload}
        containerClassName="mt-4"
      />
    </div>
  );
}
