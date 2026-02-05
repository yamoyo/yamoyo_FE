import { useMemo, useState } from 'react';

import type { TeamMemberRole } from '@/entities/teamroom/api/teamroom-dto';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
import type { Phase } from '@/widgets/teamroom/leader-game/model/types';

export default function LeaderGameStoreDebugPage() {
  const {
    role,
    phase,
    payload,
    setRole,
    setPhase,
    setPayload,
    clearPayload,
    reset,
  } = useLeaderSelectionStore();
  const [roleInput, setRoleInput] = useState<TeamMemberRole | ''>(role ?? '');
  const [phaseInput, setPhaseInput] = useState<Phase | null>(
    (phase as Phase) ?? null,
  );
  const [payloadInput, setPayloadInput] = useState<string>(
    payload ? JSON.stringify(payload, null, 2) : '',
  );

  // 보기용 JSON
  const snapshot = useMemo(() => {
    return {
      role,
      phase,
      payload,
    };
  }, [role, phase, payload]);

  const applyRole = () => {
    setRole(roleInput === '' ? null : (roleInput as TeamMemberRole));
  };

  const applyPhase = () => {
    // Phase 타입이 union이라면 select 옵션을 너 프로젝트 값에 맞게 바꿔줘
    setPhase(
      (phaseInput === null ? (null as Phase) : (phaseInput as Phase)) as Phase,
    );
  };

  const applyPayload = () => {
    const v = payloadInput.trim();
    if (!v) {
      setPayload(null);
      return;
    }
    try {
      const parsed = JSON.parse(v);
      setPayload(parsed);
    } catch (e) {
      console.error('payload JSON 파싱 실패', e);
      alert('payload JSON 파싱 실패! 올바른 JSON인지 확인해줘.');
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 bg-gray-300 p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">LeaderGame Store Debug</h1>
        <p className="text-sm text-gray-500">
          useLeaderSelectionStore 상태 확인/수정/초기화 페이지
        </p>
      </header>

      {/* 현재 스냅샷 */}
      <section className="rounded-xl border p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium">현재 상태</h2>
          <div className="flex gap-2">
            <button
              className="rounded-lg border px-3 py-1 text-sm"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2))
              }
            >
              Copy JSON
            </button>
            <button
              className="rounded-lg bg-black px-3 py-1 text-sm text-white"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
        <pre className="overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
          {JSON.stringify(snapshot, null, 2)}
        </pre>
      </section>

      {/* role */}
      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-medium">role</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={roleInput}
            onChange={(e) =>
              setRoleInput(e.target.value as TeamMemberRole | '')
            }
          >
            <option value="">(null)</option>
            {/* ⚠️ 프로젝트 enum 값에 맞게 수정 */}
            <option value="HOST">HOST</option>
            <option value="MEMBER">MEMBER</option>
          </select>
          <div className="flex gap-2">
            <button
              className="rounded-lg border px-3 py-2 text-sm"
              onClick={() => {
                setRoleInput('');
                setRole(null);
              }}
            >
              Set null
            </button>
            <button
              className="rounded-lg bg-black px-3 py-2 text-sm text-white"
              onClick={applyRole}
            >
              Apply
            </button>
          </div>
        </div>
      </section>

      {/* phase */}
      <section className="rounded-xl border p-4">
        <h2 className="mb-3 font-medium">phase</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={phase ?? ''}
            onChange={(e) => setPhaseInput(e.target.value as Phase | null)}
          >
            <option value="">(null)</option>

            <option value="LEADER_VOLUNTEER">LEADER_VOLUNTEER</option>
            <option value="LEADER_APPLICATION_WAIT">
              LEADER_APPLICATION_WAIT
            </option>
            <option value="SELECT_GAME">SELECT_GAME</option>
            <option value="LADDER_GAME">LADDER_GAME</option>
            <option value="ROULETTE_GAME">ROULETTE_GAME</option>
            <option value="ROULETTE_GAME">ROULETTE_GAME</option>
            <option value="TIMING_GAME">TIMING_GAME</option>
          </select>

          <button
            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
            onClick={applyPhase}
          >
            Apply
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Phase 타입이 다른 이름이면 위 옵션 목록만 프로젝트 정의에 맞게 바꾸면
          돼.
        </p>
      </section>

      {/* volunteerPayload */}
      <section className="rounded-xl border p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium">volunteerPayload</h2>
          <div className="flex gap-2">
            <button
              className="rounded-lg border px-3 py-1 text-sm"
              onClick={clearPayload}
            >
              Clear
            </button>
            <button
              className="rounded-lg bg-black px-3 py-1 text-sm text-white"
              onClick={applyPayload}
            >
              Apply JSON
            </button>
          </div>
        </div>

        <textarea
          className="min-h-[180px] w-full rounded-lg border px-3 py-2 font-mono text-xs"
          placeholder={`예: {"votedUserIds":[1,2],"unvotedUserIds":[3]}\n(빈값이면 null로 설정됨)`}
          value={payloadInput}
          onChange={(e) => setPayloadInput(e.target.value)}
        />
      </section>
    </div>
  );
}
