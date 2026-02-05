import { GameResultPayload } from '@/entities/leader-game/api/ws-types';
import TopBar from '@/shared/ui/header/TopBar';

import LadderBoard from './LadderBoard';

export default function LadderGame({
  gameResultPayload,
}: {
  gameResultPayload: GameResultPayload;
}) {
  return (
    <div
      style={{
        backgroundImage: 'url(/assets/game/ladder/bg-ladder-game.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
      }}
      className="flex flex-1 flex-col overflow-x-hidden"
    >
      <TopBar title="사다리게임" showBackButton={false} gameFont />

      <h1
        className="title-g outside-stroke mx-auto whitespace-pre-line text-tx-default"
        style={{ ['--stroke' as string]: '#4C5377' }}
      >
        {'예측 불허!\n가장 클래식한 운명의 복불복'}
      </h1>

      <LadderBoard
        teamLeaderIndex={1}
        containerClassName="mt-4"
        gameResultPayload={gameResultPayload}
      />
    </div>
  );
}
