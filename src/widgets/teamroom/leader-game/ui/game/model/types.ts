export type GameType = 'LADDER' | 'ROULETTE' | 'TIMING';

export interface GameOption {
  gameType: GameType;
  title: string;
  description: string;
  onSelect?: (gameType: GameType) => void;
}
