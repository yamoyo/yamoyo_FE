/** 에브리타임 시간표 파싱 요청 */
export interface ParseEverytimeRequest {
  url: string;
}

/** 가용시간 데이터 (요일별 32슬롯, 30분 단위, 08:00~24:00) */
export interface AvailabilityData {
  sunday: boolean[];
  monday: boolean[];
  tuesday: boolean[];
  wednesday: boolean[];
  thursday: boolean[];
  friday: boolean[];
  saturday: boolean[];
}

/** 에브리타임 시간표 파싱 응답 */
export interface ParseEverytimeResponse {
  availability: AvailabilityData;
}
