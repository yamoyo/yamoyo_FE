import { Step } from '@/features/leader-game/ladder-game/model/types';

/**
 * 사다리 경로 계산 함수
 *
 * ### 역할
 * - 특정 시작 열(column) 인덱스에서 출발해 사다리를 타고 내려갈 때,
 *   각 행(row)을 지날 때마다 열이 어떻게 바뀌는지 경로를 계산
 *
 * ### 입력
 * @param startIndex - 시작 열 인덱스
 * @param ladder - 사다리 줄 데이터 (각 행마다 가로줄이 있는 열 인덱스 배열)
 *
 * ### 반환값
 * @returns 경로 배열 (각 요소는 { row, col } 형태)
 */
export const getPath = (startIndex: number, ladder: number[][]): Step[] => {
  let col = startIndex;
  // 시작 위치 기록
  const path: Step[] = [{ row: -1, col }];

  ladder.forEach((row, rowIdx) => {
    if (row.includes(col)) col += 1;
    else if (row.includes(col - 1)) col -= 1;
    path.push({ row: rowIdx, col });
  });

  return path;
};
