import { useCallback, useEffect, useMemo, useState } from 'react';

import { BASE_TURNS, SPIN_DURATION_MS } from './constants';
import { RouletteGameResponse } from './types';

export function useRouletteGame(data: RouletteGameResponse | null) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const participants = useMemo(
    () => data?.participants ?? [],
    [data?.participants],
  );
  const count = participants.length;

  const spin = useCallback(() => {
    if (isSpinning || !data || gameStarted) return;

    setIsSpinning(true);
    setGameStarted(true);

    // winnerId로 당첨 인덱스 계산
    const winnerIndex = participants.findIndex(
      (p) => p.userId === data.winnerId,
    );
    if (winnerIndex === -1) return;

    const slice = 360 / count;
    const desiredAngle = (360 - (winnerIndex + 0.5) * slice) % 360;

    setRotation((prev) => {
      const current = ((prev % 360) + 360) % 360;
      const delta = (desiredAngle - current + 360) % 360;
      return prev + BASE_TURNS * 360 + delta;
    });
  }, [isSpinning, data, gameStarted, participants, count]);

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
    participants,
  };
}
