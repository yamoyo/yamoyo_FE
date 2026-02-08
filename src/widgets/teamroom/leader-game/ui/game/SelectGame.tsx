import { useEffect, useRef } from 'react';

import TopBar from '@/shared/ui/header/TopBar';
import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';

import { TimerBar } from '../TimerBar';
import { GAMES } from './model/constants';
import SelectGameItem from './SelectGameItem';

const TIMEOUT_MS = 20000; // 20초
const DEFAULT_GAME: GameType = 'LADDER'; // 타임아웃 시 기본 게임

export default function SelectGame({
  selectGame,
}: {
  selectGame: (gameType: GameType) => void;
}) {
  const startedAt = useRef(new Date()).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      selectGame(DEFAULT_GAME);
    }, TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [selectGame]);

  return (
    <>
      <TopBar title="팀장 정하기" showBackButton={false} />
      <TimerBar startedAt={startedAt} totalMs={TIMEOUT_MS} />
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
