import { startLeaderGame } from '@/entities/leader-game/api/leader-game-api';

import { Dashboard } from './Dashboard';
import LeaderGameCard from './LeaderGameCard';

type Workflow = TeamRoomDetail['workflow'];
type myRole = TeamRoomDetail['myRole'];
type teamRoomId = TeamRoomDetail['teamRoomId'];

interface Props {
  teamRoomId: teamRoomId;
  workflow: Workflow;
  myRole: myRole;
  isAllOnline: boolean;
}

export default function TeamRoomContents({
  teamRoomId,
  workflow,
  myRole,
  isAllOnline,
}: Props) {
  const isHost = myRole === 'HOST';

  /** 팀장 정하기 게임 시작 */
  const onStartLeaderGame = async () => {
    if (workflow !== 'PENDING' || myRole !== 'HOST') {
      alert('잘못된 접근입니다.');
      return;
    }
    try {
      await startLeaderGame(teamRoomId);
    } catch (error) {
      console.error('팀장 정하기 게임 시작 중 오류가 발생했습니다.', error);
      alert('팀장 정하기 게임 시작에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (workflow === 'PENDING') {
    return (
      <LeaderGameCard
        onStart={onStartLeaderGame}
        isAllOnline={isAllOnline}
        isHost={isHost}
      />
    );
  }

  if (workflow === 'SETUP') {
    return <Dashboard />;
  }

  return <p>데이터를 불러오고 있습니다...</p>;
}
