export type Phase =
  | 'LEADER_APPLICATION' // 팀장 지원
  | 'LEADER_APPLICATION_WAIT' // 팀장 지원 선택 후 결과 대기
  | 'SELECT_GAME' // 방장이 게임 선택
  | 'LADDER_GAME' // 사다리 게임
  | 'ROULETTE_GAME' // 룰렛 돌리기
  | 'TIMING_GAME' // 타이밍 게임
  | null;

export interface VoteCharacter {
  id: number;
  name: string;
  imgId: number;
}
