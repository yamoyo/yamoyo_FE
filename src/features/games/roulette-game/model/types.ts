import { Participant } from '../../ladder-game/model/types';

export interface RouletteGameResponse {
  winnerId: number;
  winnerName: string;
  participants: Participant[];
}
