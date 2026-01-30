interface Participant {
  userId: number;
  characterId: number;
  name: string;
}

export interface RouletteGameResponse {
  winnerId: number;
  winnerName: string;
  participants: Participant[];
}
