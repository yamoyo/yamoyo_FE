import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dashboard } from './Dashboard';
import LeaderGameCard from './LeaderGameCard';

type Phase = 'LEADER_SELECTION' | 'LEADER_CONFIRMED'; // 팀장 정하기 전/후 단계로 나뉨

export default function TeamRoomContents() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('LEADER_SELECTION');

  useEffect(() => {
    // TODO: 서버에서 현재 phase 정보를 받아오는 로직
    setPhase('LEADER_CONFIRMED');
  }, []);

  /** 팀장 정하기 게임 시작 */
  const onStartLeaderGame = () => {
    // TODO: API 연동 후 팀장 정하기 게임 화면으로 이동
    navigate('leader');
  };

  if (phase === 'LEADER_SELECTION') {
    return <LeaderGameCard onStart={onStartLeaderGame} />;
  }

  if (phase === 'LEADER_CONFIRMED') {
    return <Dashboard />;
  }

  return <p>데이터를 불러오고 있습니다...</p>;
}
