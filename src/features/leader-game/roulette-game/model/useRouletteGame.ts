import { useCallback, useEffect, useMemo, useState } from 'react';

import { GameResultPayload } from '@/entities/leader-game/api/ws-types';

import { BASE_TURNS, SPIN_DURATION_MS } from './constants';

export function useRouletteGame(payload: GameResultPayload) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const participants = useMemo(
    () => payload.participants,
    [payload.participants],
  );
  const count = participants.length;

  const spin = useCallback(() => {
    if (isSpinning || !payload || gameStarted) return;
    setIsSpinning(true);
    setGameStarted(true);

    // winnerId로 당첨 인덱스 계산
    const winnerIndex = participants.findIndex(
      (p) => p.userId === payload.winnerId,
    );
    if (winnerIndex === -1) return;

    const slice = 360 / count;
    const desiredAngle = (360 - (winnerIndex + 0.5) * slice) % 360;

    setRotation((prev) => {
      const current = ((prev % 360) + 360) % 360;
      const delta = (desiredAngle - current + 360) % 360;
      return prev + BASE_TURNS * 360 + delta;
    });
  }, [isSpinning, payload, gameStarted, participants, count]);

  useEffect(() => {
    if (!isSpinning) return;

    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, SPIN_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isSpinning]);

  return {
    rotation,
    spin,
    isSpinning,
    gameStarted,
  };
}
