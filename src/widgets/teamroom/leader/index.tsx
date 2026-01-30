import { useEffect, useState } from 'react';
import { Phase } from './model/type';
import LeaderApplication from './ui/leader-application/LeaderApplication';
import LeaderApplicationWait from './ui/leader-application/LeaderApplicationWait';
import SelectGame from './ui/game/SelectGame';
import PixelStatusMessage from '@/shared/ui/display/PixelStatusMessage';
import { TimingGame } from '@/features/games/timing-game/ui/TimingGame';
import LadderGame from '@/features/games/ladder-game/ui/LadderGame';

export function SelectLeader() {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [userRole, setUserRole] = useState<'ROOM_MANAGER' | 'ROOM_MEMBER'>(
    'ROOM_MEMBER',
  );

  useEffect(() => {
    // TODO: 서버에서 현재 phase, role 정보를 받아오는 로직
    setPhase('ROULETTE_GAME');
    // setPhase('LEADER_APPLICATION');
    setUserRole('ROOM_MANAGER');
  }, []);

  if (!phase) {
    // TODO: 로딩 스피너로 교체
    return <p>데이터를 불러오고 있습니다...</p>;
  }

  if (phase === 'LEADER_APPLICATION') {
    return (
      <LeaderApplication onNext={() => setPhase('LEADER_APPLICATION_WAIT')} />
    );
  }

  if (phase === 'LEADER_APPLICATION_WAIT') {
    return <LeaderApplicationWait onNext={() => setPhase('SELECT_GAME')} />;
  }

  if (phase === 'SELECT_GAME') {
    return userRole === 'ROOM_MANAGER' ? (
      <SelectGame />
    ) : (
      <PixelStatusMessage
        message="방장이 게임을 선택하고 있어요."
        className="flex-1 translate-y-[-5vh]"
      />
    );
  }

  if (phase === 'LADDER_GAME') {
    return <LadderGame />;
  }

  if (phase === 'TIMING_GAME') {
    return <TimingGame />;
  }

  return null;
}
