export type Phase =
  | 'LEADER_APPLICATION' // 팀장 지원
  | 'LEADER_APPLICATION_WAIT' // 팀장 지원 선택 후 결과 대기
  | 'SELECT_GAME' // 방장이 게임 선택
  | null;

export interface VoteCharacter {
  id: number;
  name: string;
  imgId: number;
}
