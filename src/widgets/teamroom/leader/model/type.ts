export type Phase =
  | 'LEADER_APPLICATION' // 팀장 지원
  | 'LEADER_APPLICATION_WAIT' // 팀장 지원 선택 후 결과 대기
  | 'AUTO_SELECT_RESULT'
  | 'SELECT_GAME'
  | 'GAME_READY'
  | 'GAME_PLAYING'
  | 'GAME_RESULT'
  | null;

export interface VoteCharacter {
  id: number;
  name: string;
  imgId: number;
}
