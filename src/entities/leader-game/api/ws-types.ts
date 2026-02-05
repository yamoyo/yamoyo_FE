import { GameType } from '@/widgets/teamroom/leader-game/ui/game/model/types';

type OnlineStatusMessage = {
  profileImageId: number | null;
  status: 'ONLINE' | 'OFFLINE';
  type: 'USER_STATUS_CHANGE';
  userId: number;
  username: string;
};

// 지원하기 단계 | 방장이 게임 선택 | 타이밍 게임 대기 | 타이밍 게임 진행
type Phase = 'VOLUNTEER' | 'GAME_SELECT' | 'GAME_READY' | 'GAME_PLAYING';

export interface Participants {
  userId: number;
  name: string;
  profileImageId: number | null;
}

export interface GameResultPayload {
  gameType: GameType;
  winnerId: number;
  winnerName: string;
  participants: Participants[];
  gameData: LadderGameData | null;
}

export interface LadderGameData {
  ladderLines: number[][];
}

export interface UserJoinedMessage {
  type: 'USER_JOINED';
  payload: {
    userId: number;
    name: string;
    profileImageId: number;
  };
}

export interface UserLeftMessage {
  type: 'USER_LEFT';
  payload: {
    userId: number;
  };
}

// 팀장 자원하기 단계가 변경되었을 때 메시지 타입
export interface PhaseChangeMessage {
  type: 'PHASE_CHANGE';
  payload: {
    phase: Phase;
    phaseStartTime: number; // 1770194306432
    durationSeconds: number; // 30
    selectedGame: null;
  };
}

export interface GameResultMessage {
  type: 'GAME_RESULT';
  payload: GameResultPayload;
}

export interface VoteUpdatedPayload {
  votedUserIds: number[];
  unvotedUserIds: number[];
  volunteerIds: number[];
  totalCount: number;
  votedCount: number;
}

// 누군가 팀장 지원 상태를 업데이트했을 때 메시지 타입
export interface VolunteerUpdatedMessage {
  type: 'VOTE_UPDATED';
  payload: VoteUpdatedPayload;
}

export type LeaderGameMessage =
  | OnlineStatusMessage
  | PhaseChangeMessage
  | UserJoinedMessage
  | UserLeftMessage
  | VolunteerUpdatedMessage
  | GameResultMessage;
