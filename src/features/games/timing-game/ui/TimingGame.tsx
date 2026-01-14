'use client';

import { useTimingGame } from '../model/useTimingGame';

export function TimingGame() {
  const {
    TARGET_SECONDS,
    elapsed,
    isRunning,
    difference,
    diffText,
    start,
    handleStopOrReset,
  } = useTimingGame();

  return (
    <div className="h-screen flex-col bg-slate-900 text-slate-50 flex-center">
      {/* 타이틀 */}
      <h1 className="mb-2 text-3xl font-bold">타이밍 맞추기</h1>
      <p className="mb-8 text-sm text-slate-400">
        목표 시간에 최대한 가깝게 정지를 눌러보세요.
      </p>

      {/* 목표 시간 / 현재 시간 */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="text-sm text-slate-400">
          목표 시간:{' '}
          <span className="font-semibold text-sky-300">
            {TARGET_SECONDS.toFixed(3)}초
          </span>
        </div>

        <div className="flex items-baseline gap-2 rounded-2xl bg-slate-800 px-6 py-4 shadow-lg">
          <span className="font-mono text-5xl tabular-nums">
            {elapsed.toFixed(3)}
          </span>
          <span className="text-lg text-slate-400">sec</span>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={start}
          disabled={isRunning}
          className={`h-10 rounded-lg px-4 text-sm font-semibold transition ${
            isRunning
              ? 'cursor-not-allowed bg-slate-600 text-slate-300'
              : 'bg-emerald-500 text-white hover:bg-emerald-400'
          }`}
        >
          시작
        </button>
        <button
          onClick={handleStopOrReset}
          className={`h-10 rounded-lg px-4 text-sm font-semibold transition ${
            isRunning
              ? 'bg-rose-500 text-white hover:bg-rose-400'
              : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
          }`}
        >
          {isRunning ? '정지' : '다시하기'}
        </button>
      </div>

      {/* 결과 메시지 */}
      {difference !== null && (
        <div className="text-center">
          <div className="mb-1 text-sm text-slate-300">
            목표: {TARGET_SECONDS.toFixed(3)}초 / 내 기록: {elapsed.toFixed(3)}
            초
          </div>
          <div className="text-base font-semibold text-sky-300">{diffText}</div>
        </div>
      )}
    </div>
  );
}
