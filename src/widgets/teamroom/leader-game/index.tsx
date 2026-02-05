import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { leaderGameApi } from '@/entities/leader-game/api/leader-game-api';
import {
  GameResultPayload,
  LeaderGameMessage,
  VoteUpdatedPayload,
} from '@/entities/leader-game/api/ws-types';
import { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import LadderGame from '@/features/leader-game/ladder-game/ui/LadderGame';
import { TimingGame } from '@/features/leader-game/timing-game/ui/TimingGame';
import { useLeaderGameStore } from '@/features/leader-game/ws/model/leader-game-store';
import { useLeaderGameSocket } from '@/features/leader-game/ws/model/useLeaderGameSocket';
import { useTeamRoomWsListener } from '@/features/leader-game/ws/model/useTeamRoomWsListener';
import RouletteGame from '@/pages/games/roulette';
import PixelStatusMessage from '@/shared/ui/display/PixelStatusMessage';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';

import SelectGame from './ui/game/SelectGame';
import LeaderApplication from './ui/leader-application/LeaderApplication';
import LeaderApplicationWait from './ui/leader-application/LeaderApplicationWait';

export function SelectLeader() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const phase = useLeaderGameStore((s) => s.phase);
  const role = useLeaderGameStore((s) => s.role);
  const payload = useLeaderGameStore((s) => s.payload);
  const setPhase = useLeaderGameStore((s) => s.setPhase);
  const setPayload = useLeaderGameStore((s) => s.setPayload);
  const openCharacterModal = useModalStore((s) => s.openCharacterModal);

  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [voteUpdatedPayload, setVoteUpdatedPayload] =
    useState<VoteUpdatedPayload | null>(null);
  const [gameResultPayload, setGameResultPayload] =
    useState<GameResultPayload | null>(null);

  // 타이밍 게임 진행 후 팀장이 선정되었을 때 모달 표시
  const handleTimingGameResult = (
    winnerId: number | string,
    winnerName: string,
  ) => {
    const profileImageId = members?.find(
      (p) => p.userId === winnerId,
    )?.profileImageId;
    openCharacterModal({
      title: `[${winnerName}]님! 팀장으로 선택되었습니다!`,
      subTitle: '축하합니다. 팀 빌딩을 이어가주세요.',
      type: 'CROWN',
      characterId: profileImageId ?? 1,
      onClick: () => navigate('..', { replace: true }),
      buttonText: '팀룸으로 돌아가기',
    });
  };

  const onRoomMessage = (msg: LeaderGameMessage) => {
    const { type } = msg;
    if (type === 'PHASE_CHANGE') setPayload(msg.payload);

    if (type === 'PHASE_CHANGE' && msg.payload.phase === 'GAME_PLAYING') {
      setPhase('TIMING_GAME');
      return;
    }
    if (type === 'GAME_RESULT') {
      switch (msg.payload.gameType) {
        case 'LADDER':
          setGameResultPayload(msg.payload);
          setPhase('LADDER_GAME');
          return;
        case 'ROULETTE':
          setGameResultPayload(msg.payload);
          setPhase('ROULETTE_GAME');
          return;
        case 'TIMING':
          const { winnerId, winnerName } = msg.payload;
          handleTimingGameResult(winnerId, winnerName);
          return;
      }
    }
    // eslint-disable-next-line
    console.log('팀장 정하기 게임 WS 메시지 수신:', msg);
  };

  useTeamRoomWsListener(onRoomMessage);

  const { actions } = useLeaderGameSocket({
    roomId: id,
    enabled: Boolean(id),
    onJoinSuccess: (data) => {
      // eslint-disable-next-line
      console.log('팀장 정하기 게임 참가 성공:', data);
    },
    onVoteUpdated: (data) => {
      // eslint-disable-next-line
      console.log('투표 현황 업데이트:', data);
      setVoteUpdatedPayload(data.payload);
    },
  });

  // 팀장 자원하기
  const volunteerAsLeader = () => actions.volunteer();
  // 팀장 포기하기
  const passAsLeader = () => actions.pass();
  // 게임 선택하기 (방장 전용)
  const selectGame = (gameType: GameType) => actions.selectGame(gameType);
  // 타이밍 게임 결과 전송
  const submitTimingResult = (timeDifference: number) =>
    actions.submitTimingResult(timeDifference);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const members = await leaderGameApi.getOnlineStatus(id);
      setMembers(members);
    })();
  }, [id]);

  if (!phase) {
    // TODO: 로딩 스피너로 교체
    return <p>데이터를 불러오고 있습니다...</p>;
  }

  if (phase === 'LEADER_VOLUNTEER') {
    return (
      <LeaderApplication
        volunteerAsLeader={volunteerAsLeader}
        passAsLeader={passAsLeader}
      />
    );
  }

  if (phase === 'LEADER_APPLICATION_WAIT' && members && voteUpdatedPayload) {
    return (
      <LeaderApplicationWait
        members={members}
        voteUpdatedPayload={voteUpdatedPayload}
      />
    );
  }

  if (phase === 'SELECT_GAME') {
    return role === 'HOST' ? (
      <SelectGame selectGame={selectGame} />
    ) : (
      <PixelStatusMessage
        message="방장이 게임을 선택하고 있어요."
        className="flex-1 translate-y-[-5vh]"
      />
    );
  }

  if (phase === 'LADDER_GAME' && gameResultPayload) {
    return <LadderGame gameResultPayload={gameResultPayload} />;
  }

  if (phase === 'ROULETTE_GAME' && gameResultPayload) {
    return <RouletteGame gameResultPayload={gameResultPayload} />;
  }

  if (phase === 'TIMING_GAME' && payload) {
    return <TimingGame {...payload} submitTimingResult={submitTimingResult} />;
  }

  return <p>이전 처리를 진행 중입니다. 잠시만 기다려 주세요.</p>;
}
