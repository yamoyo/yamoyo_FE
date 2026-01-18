'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouletteGame } from '../model/useRouletteGame';

const WHEEL_SIZE_PX = 456;
const LABEL_RADIUS_RATIO = 0.4;
const SEGMENT_STROKE = 'rgba(0, 0, 0, 0.12)';
const ARROW_WIDTH_RATIO = 48 / WHEEL_SIZE_PX;
const ARROW_HEIGHT_RATIO = 58 / WHEEL_SIZE_PX;
const ARROW_OFFSET_Y_RATIO = -34 / WHEEL_SIZE_PX;
const ARROW_OFFSET_X_PX = 1;

export function RouletteGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const names = useMemo(
    () => [
      '준열',
      '민혁',
      '서영',
      '재형',
      '지우',
      '우인',
      '상엽',
      '우진',
      '종현',
    ],
    [],
  );
  const normalizedNames = useMemo(
    () => (names.length > 0 ? names.slice(0, 20) : ['']),
    [names],
  );
  const { rotation, spin } = useRouletteGame(normalizedNames.length);
  const count = normalizedNames.length;
  const slice = 360 / count;
  const labelRadius = (WHEEL_SIZE_PX / 2) * LABEL_RADIUS_RATIO;
  const labelFontSize =
    count >= 16 ? 12 : count >= 12 ? 13 : count >= 8 ? 14 : 16;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = WHEEL_SIZE_PX;
    const radius = size / 2;
    const slice = (Math.PI * 2) / count;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    ctx.translate(radius, radius);

    for (let i = 0; i < count; i += 1) {
      const startAngle = i * slice - Math.PI / 2;
      const endAngle = startAngle + slice;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${(i * 360) / count}, 80%, 58%)`;
      ctx.fill();
      ctx.strokeStyle = SEGMENT_STROKE;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [count, normalizedNames]);

  return (
    <div className="min-h-dvh bg-white px-4 py-8 flex-col-center">
      <div className="relative aspect-square w-[459px] max-w-full">
        <div
          className="absolute inset-0 origin-center transition-transform duration-[1600ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <canvas
            ref={canvasRef}
            aria-label="룰렛 본체"
            className="absolute inset-0 h-full w-full rounded-full"
          />
          {normalizedNames.map((name, i) => {
            const angle = i * slice + slice / 2;
            return (
              <span
                key={`${name}-${i}`}
                className="absolute left-1/2 top-1/2 font-galmuri-14 text-title-3 text-black transition-transform duration-[1600ms] ease-out"
                style={{
                  fontSize: `${labelFontSize}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${labelRadius}px) rotate(${-angle}deg) rotate(${-rotation}deg)`,
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            );
          })}
        </div>
        <img
          src="/assets/roulette/roulette-border.svg"
          alt="룰렛 테두리"
          draggable={false}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+3px)] w-[calc(100%+3px)] -translate-x-1/2 -translate-y-1/2 select-none"
        />
        <img
          src="/assets/roulette/roulette-arrow.svg"
          alt="룰렛 화살표"
          draggable={false}
          className="pointer-events-none absolute select-none"
          style={{
            width: `${ARROW_WIDTH_RATIO * 100}%`,
            height: `${ARROW_HEIGHT_RATIO * 100}%`,
            top: `${ARROW_OFFSET_Y_RATIO * 100}%`,
            left: '50%',
            transform: `translateX(calc(-50% + ${ARROW_OFFSET_X_PX}px))`,
          }}
        />
      </div>

      <button
        type="button"
        onClick={spin}
        className="mt-6 rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        게임시작
      </button>
    </div>
  );
}
