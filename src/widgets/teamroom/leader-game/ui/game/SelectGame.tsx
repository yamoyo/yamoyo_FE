import TopBar from '@/shared/ui/header/TopBar';
import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';

import { GAMES } from './model/constants';
import SelectGameItem from './SelectGameItem';

export default function SelectGame({
  selectGame,
}: {
  selectGame: (gameType: GameType) => void;
}) {
  return (
    <>
      <TopBar title="팀장 정하기" showBackButton={false} />
      {/* <TimerBar startedAt={startedAt} /> */}
      <div className="mt-8 px-6">
        <h1 className="mb-1 text-title-2 text-tx-default_2">
          팀장을 어떻게 찾을까요?
        </h1>
        <p className="text-body-5 text-tx-default_4">
          방장님, 우리 팀에 가장 어색하지 않은 방식을 골라주세요.
        </p>
        <div className="mt-9 space-y-6">
          {GAMES.map((game) => (
            <SelectGameItem
              {...game}
              key={game.gameType}
              onSelect={selectGame}
            />
          ))}
        </div>
      </div>
    </>
  );
}
