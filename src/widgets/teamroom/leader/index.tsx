import { useEffect, useState } from 'react';
import { Phase } from './model/type';
import LeaderApplication from './ui/LeaderApplication';

export function SelectLeader() {
  const [phase, setPhase] = useState<Phase>(null);

  useEffect(() => {
    // TODO: 서버에서 현재 phase 정보를 받아오는 로직 추가 필요
    setPhase('LEADER_APPLICATION');
  }, []);

  if (phase === 'LEADER_APPLICATION') {
    return (
      <LeaderApplication onNext={() => setPhase('LEADER_APPLICATION_WAIT')} />
    );
  }

  if (phase === 'LEADER_APPLICATION_WAIT') {
    return <p>팀장 지원 결과를 기다리는 중...</p>;
  }

  // TODO: 로딩 스피너 컴포넌트로 교체 필요
  return <p>데이터를 불러오고 있습니다...</p>;
}
