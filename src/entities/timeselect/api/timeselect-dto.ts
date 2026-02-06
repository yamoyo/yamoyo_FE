import type { AvailabilityData } from '@/entities/everytime/api/everytime-dto';

// ========== Enums ==========

export type PreferredBlock =
  | 'BLOCK_08_12'
  | 'BLOCK_12_16'
  | 'BLOCK_16_20'
  | 'BLOCK_20_24';

export type TimeSelectStatus = 'OPEN' | 'FINALIZED';

export type TimeSelectParticipantStatus = 'PENDING' | 'SUBMITTED' | 'EXPIRED';

// ========== 타임셀렉트 조회 ==========

export interface MyTimeSelectStatusDto {
  availabilityStatus: TimeSelectParticipantStatus;
  preferredBlockStatus: TimeSelectParticipantStatus;
}

export interface TimeSelectResponse {
  timepickId: number;
  status: TimeSelectStatus;
  deadline: string; // ISO datetime
  myStatus: MyTimeSelectStatusDto;
}

// ========== 가용시간 제출 ==========

export interface SubmitAvailabilityRequest {
  availability: AvailabilityData;
}

// ========== 선호시간대 제출 ==========

export interface SubmitPreferredBlockRequest {
  preferredBlock: PreferredBlock;
}

// ========== 가용시간 기본값 조회 ==========

export interface AvailabilityDefaultResponse {
  availability: AvailabilityData;
}
