import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getOnlineStatus } from '@/entities/leader-game/api/leader-game-api';
import {
  GameResultPayload,
  LeaderGameMessage,
  ReloadMessage,
  VolunteerUpdatedMessage,
  VoteUpdatedPayload,
} from '@/entities/leader-game/api/ws-types';
import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import LadderGame from '@/features/leader-game/ladder-game/ui/LadderGame';
import { TimingGame } from '@/features/leader-game/timing-game/ui/TimingGame';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
import { useLeaderGameSocket } from '@/features/leader-game/ws/model/useLeaderGameSocket';
import { useTeamRoomWsListener } from '@/features/leader-game/ws/model/useTeamRoomWsListener';
import RouletteGame from '@/pages/games/roulette';
import { useAuthStore } from '@/shared/api/auth/store';
import PixelStatusMessage from '@/shared/ui/display/PixelStatusMessage';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';
import SelectGame from '@/widgets/teamroom/leader-game/ui/game/SelectGame';
import LeaderApplication from '@/widgets/teamroom/leader-game/ui/leader-application/LeaderApplication';
import LeaderApplicationWait from '@/widgets/teamroom/leader-game/ui/leader-application/LeaderApplicationWait';

export function SelectLeader() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const accessToken = useAuthStore((s) => s.accessToken);
  const phase = useLeaderSelectionStore((s) => s.phase);
  const role = useLeaderSelectionStore((s) => s.role);
  const payload = useLeaderSelectionStore((s) => s.payload);
  const setPhase = useLeaderSelectionStore((s) => s.setPhase);
  const setRole = useLeaderSelectionStore((s) => s.setRole);
  const setPayload = useLeaderSelectionStore((s) => s.setPayload);
  const setWorkflow = useLeaderSelectionStore((s) => s.setWorkflow);

  const openCharacterModal = useModalStore((s) => s.openCharacterModal);

  const myUserId = accessToken
    ? jwtDecode<{ sub: string }>(accessToken).sub
    : null;

  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [voteUpdatedPayload, setVoteUpdatedPayload] =
    useState<VoteUpdatedPayload | null>(null);
  const [gameResultPayload, setGameResultPayload] =
    useState<GameResultPayload | null>(null);
  const [isVolunteered, setIsVolunteered] = useState(true);

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
      onClick: () => {
        navigate('..', { replace: true });
        setWorkflow('SETUP');
      },
      buttonText: '팀룸으로 이동',
    });
  };

  /** 팀장 지원 투표 후 결과 화면으로 이동 (phase를 'LEADER_APPLICATION_WAIT'로 변경) */
  const goToLeaderApplicationWaitPhase = (payload: VoteUpdatedPayload) => {
    if (phase !== 'LEADER_VOLUNTEER' || !accessToken) return;

    if (!myUserId) return;

    const isVolunteer = payload.votedUserIds.includes(Number(myUserId));
    if (isVolunteer) setPhase('LEADER_APPLICATION_WAIT');
  };

  const onRoomMessage = async (msg: LeaderGameMessage) => {
    const { type } = msg;
    if (type === 'PHASE_CHANGE') setPayload(msg.payload);

    if (type === 'PHASE_CHANGE' && msg.payload.phase === 'GAME_PLAYING') {
      setPhase('TIMING_GAME');
      return;
    }

    if (type === 'PHASE_CHANGE' && msg.payload.phase === 'GAME_SELECT') {
      setPhase('SELECT_GAME');
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
  };

  useTeamRoomWsListener(onRoomMessage);

  const onJoinResponse = async (
    data: VolunteerUpdatedMessage | ReloadMessage,
  ) => {
    const { type, payload } = data;
    if (type === 'VOTE_UPDATED') {
      setVoteUpdatedPayload(payload);
      // 팀장 지원 투표 결과에 따라 phase 변경
      goToLeaderApplicationWaitPhase(payload);
      return;
    }

    if (type === 'RELOAD_SUCCESS') {
      const { currentPhase, phaseStartTime, remainingTime, selectedGame } =
        payload;
      const reloadedPayload = {
        phase: currentPhase,
        phaseStartTime,
        durationSeconds: remainingTime,
        selectedGame,
      };
      setPayload(reloadedPayload);

      // 1. 팀장 자원 단계
      if (currentPhase === 'VOLUNTEER') {
        if (!myUserId) return;
        const isVolunteer = payload.volunteers.includes(Number(myUserId));
        if (isVolunteer) {
          setPhase('LEADER_APPLICATION_WAIT');
        } else {
          setPhase('LEADER_VOLUNTEER');
        }
        if (!id) return;
        const teamRoom = await getTeamRoomDetail(id);
        setRole(teamRoom.myRole);
        return;
      }
      // 2. 팀장이 게임 선택 단계
      if (currentPhase === 'GAME_SELECT') {
        if (!id || role) return;
        try {
          const teamRoom = await getTeamRoomDetail(id);
          setRole(teamRoom.myRole);
          setPhase('SELECT_GAME');
        } catch (error) {
          console.error('팀룸 상세 조회 실패', error);
          alert('팀룸 정보를 불러오지 못했습니다. 다시 시도해주세요.');
        }
        return;
      }
      // 3. 게임 진행 단계 (타이밍 게임)
      if (payload.currentPhase === 'GAME_PLAYING') {
        setPhase('TIMING_GAME');
        return;
      }
    }
  };

  const { actions } = useLeaderGameSocket({
    roomId: id,
    enabled: Boolean(id),
    onJoinResponse,
  });

  // 팀장 자원하기
  const volunteerAsLeader = () => {
    actions.volunteer();
    setIsVolunteered(true);
  };
  // 팀장 포기하기
  const passAsLeader = () => {
    actions.pass();
    setIsVolunteered(false);
  };
  // 게임 선택하기 (방장 전용)
  const selectGame = (gameType: GameType) => actions.selectGame(gameType);
  // 타이밍 게임 결과 전송
  const submitTimingResult = (timeDifference: number) =>
    actions.submitTimingResult(timeDifference);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const members = await getOnlineStatus(id);
      setMembers(members);
      setWorkflow('LEADER_SELECTION');
    })();
  }, [id, setWorkflow]);

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
    if (isVolunteered) {
      return (
        <TimingGame {...payload} submitTimingResult={submitTimingResult} />
      );
    }
    return (
      <PixelStatusMessage
        message={
          '팀장을 지원한 팀원들이 게임을 진행 중입니다.\n잠시만 기다려 주세요.'
        }
        fullScreen
      />
    );
  }

  return <p>이전 처리를 진행 중입니다. 잠시만 기다려 주세요.</p>;
}
