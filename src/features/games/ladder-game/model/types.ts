export interface Step {
  row: number;
  col: number;
}

export type PosAxisById = Record<number, { x: number; y: number }>;

type ColIndex = number;
type RowIndex = number;
export type ColumnToRowsMap = Map<ColIndex, RowIndex[]>;

export interface Participant {
  userId: number;
  characterId: number;
  name: string;
}

interface LadderGameData {
  ladderLines: number[][];
}

export interface LadderGameResponse {
  winnerId: number;
  winnerName: string;
  participants: Participant[];
  gameData: LadderGameData;
}
