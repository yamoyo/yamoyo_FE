import { create } from 'zustand';

import type { AvailabilityData } from '../api/everytime-dto';

/** 7일 x 32슬롯 2차원 배열 형태 */
export type AvailabilityGrid = boolean[][];

/** API 응답(객체) → Grid(2차원 배열) 변환 (일~토 순서) */
export function availabilityDataToGrid(
  data: AvailabilityData,
): AvailabilityGrid {
  return [
    data.sunday,
    data.monday,
    data.tuesday,
    data.wednesday,
    data.thursday,
    data.friday,
    data.saturday,
  ];
}

/** Grid(2차원 배열) → API 요청(객체) 변환 */
export function gridToAvailabilityData(
  grid: AvailabilityGrid,
): AvailabilityData {
  return {
    sunday: grid[0] ?? [],
    monday: grid[1] ?? [],
    tuesday: grid[2] ?? [],
    wednesday: grid[3] ?? [],
    thursday: grid[4] ?? [],
    friday: grid[5] ?? [],
    saturday: grid[6] ?? [],
  };
}

interface AvailabilityState {
  /** 에브리타임에서 불러온 가용시간 (null이면 불러온 적 없음) */
  importedAvailability: AvailabilityGrid | null;
  /** 에브리타임 가용시간 저장 */
  setImportedAvailability: (data: AvailabilityData) => void;
  /** 초기화 */
  clearImportedAvailability: () => void;
}

export const useAvailabilityStore = create<AvailabilityState>((set) => ({
  importedAvailability: null,

  setImportedAvailability: (data) =>
    set({ importedAvailability: availabilityDataToGrid(data) }),

  clearImportedAvailability: () => set({ importedAvailability: null }),
}));
