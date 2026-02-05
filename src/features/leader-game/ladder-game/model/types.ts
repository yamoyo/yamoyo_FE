export interface Step {
  row: number;
  col: number;
}

export type PosAxisById = Record<number, { x: number; y: number }>;

type ColIndex = number;
type RowIndex = number;
export type ColumnToRowsMap = Map<ColIndex, RowIndex[]>;
