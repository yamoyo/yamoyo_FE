'use client';

import { useEffect, useRef } from 'react';
import {
  SPIN_DURATION_MS,
  WHEEL_SIZE_PX,
  BORDER_SIZE_PX,
  ARROW_WRAPPER_HEIGHT_PX,
  ARROW_HEIGHT_PX,
  ARROW_WIDTH_PX,
  ARROW_OFFSET_X_PX,
  LABEL_RADIUS_RATIO,
  SEGMENT_STROKE,
  SEGMENT_COLORS,
} from '../model/constants';

interface RouletteBoardProps {
  names: string[];
  rotation: number;
}

export default function RouletteBoard({ names, rotation }: RouletteBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const normalizedNames = names.slice(0, 12);
  const count = normalizedNames.length;
  const slice = 360 / count;
  const labelRadius = (WHEEL_SIZE_PX / 2) * LABEL_RADIUS_RATIO;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = WHEEL_SIZE_PX;
    const radius = size / 2;
    const sliceRad = (Math.PI * 2) / count;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    ctx.translate(radius, radius);

    for (let i = 0; i < count; i += 1) {
      const startAngle = i * sliceRad - Math.PI / 2;
      const endAngle = startAngle + sliceRad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = SEGMENT_STROKE;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [count, normalizedNames]);

  return (
    <div className="relative mb-[41px] mt-[64px] size-[459px] shrink-0">
      <div
        className="origin-center ease-out"
        style={{
          position: 'absolute',
          width: `${WHEEL_SIZE_PX}px`,
          height: `${WHEEL_SIZE_PX}px`,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          transitionProperty: 'transform',
          transitionDuration: `${SPIN_DURATION_MS}ms`,
        }}
      >
        <canvas
          ref={canvasRef}
          aria-label="룰렛 본체"
          className="rounded-full"
          style={{ width: `${WHEEL_SIZE_PX}px`, height: `${WHEEL_SIZE_PX}px` }}
        />
        {normalizedNames.map((name, i) => {
          const angle = i * slice + slice / 2;
          return (
            <span
              key={`${name}-${i}`}
              className="body-g2 absolute left-1/2 top-1/2 text-black ease-out"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${labelRadius}px) rotate(${-angle}deg) rotate(${-rotation}deg)`,
                whiteSpace: 'nowrap',
                transitionProperty: 'transform',
                transitionDuration: `${SPIN_DURATION_MS}ms`,
              }}
            >
              {name}
            </span>
          );
        })}
      </div>
      <img
        src="/assets/game/roulette/roulette-border.svg"
        alt="룰렛 테두리"
        draggable={false}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ width: `${BORDER_SIZE_PX}px`, height: `${BORDER_SIZE_PX}px` }}
      />
      <div
        className="pointer-events-none absolute left-1/2 flex select-none items-end justify-center"
        style={{
          width: `${ARROW_WIDTH_PX}px`,
          height: `${ARROW_WRAPPER_HEIGHT_PX}px`,
          top: 'calc(50% - 275.5px)',
          transform: `translateX(calc(-50% + ${ARROW_OFFSET_X_PX}px))`,
        }}
      >
        <img
          src="/assets/game/roulette/roulette-arrow.svg"
          alt="룰렛 화살표"
          draggable={false}
          style={{
            width: `${ARROW_WIDTH_PX}px`,
            height: `${ARROW_HEIGHT_PX}px`,
          }}
        />
      </div>
    </div>
  );
}
