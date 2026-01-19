import { useState, useEffect } from 'react';

const BASE_TURNS = 5;
const SPIN_DURATION_MS = 1600;

export function useRouletteGame(count: number) {
  const safeCount = Math.max(1, Math.min(20, count));
  const [rotation, setRotation] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const targetIndex = Math.floor(Math.random() * safeCount);
    const slice = 360 / safeCount;
    const desiredAngle = (360 - (targetIndex + 0.5) * slice) % 360;

    setRotation((prev) => {
      const current = ((prev % 360) + 360) % 360;
      const delta = (desiredAngle - current + 360) % 360;
      return prev + BASE_TURNS * 360 + delta;
    });

    setResultIndex(targetIndex);
  };

  useEffect(() => {
    if (!isSpinning) return;

    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, SPIN_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isSpinning]);

  return {
    rotation,
    resultIndex,
    spin,
    isSpinning,
  };
}
