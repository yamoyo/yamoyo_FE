export type MeetingColor =
  | 'PURPLE'
  | 'YELLOW'
  | 'PALE_PINK'
  | 'BLUE'
  | 'MINT'
  | 'PINK'
  | 'ORANGE';

export type MeetingType =
  | 'INITIAL_REGULAR'
  | 'ADDITIONAL_RECURRING'
  | 'ADDITIONAL_ONE_TIME';

export interface MeetingSummary {
  meetingId: number;
  meetingSeriesId: number;
  title: string;
  startTime: string; // "2025-02-15T14:00:00"
  endTime: string; // "2025-02-15T15:30:00"
  durationMinutes: number;
  color: MeetingColor;
  meetingType: MeetingType;
  isIndividuallyModified: boolean;
  participantCount: number;
  location?: string | null;
}

export interface MeetingListResponse {
  year: number;
  month: number;
  meetings: MeetingSummary[];
}

// ========== 회의 생성 ==========

export interface CreateMeetingRequest {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm (정각 또는 30분만 가능)
  endTime: string; // HH:mm (30분 단위, 최소 30분 ~ 최대 2시간)
  color: Exclude<MeetingColor, 'PURPLE'>; // PURPLE은 INITIAL_REGULAR 전용
  isRecurring: boolean;
  participantUserIds: number[];
}

export interface CreateMeetingResponse {
  meetingSeriesId: number;
  meetingIds: number[];
  createdMeetingCount: number;
}

// ========== 회의 상세 조회 ==========

export interface MeetingParticipant {
  userId: number;
  name: string;
  profileImageId: number;
}

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface MeetingDetailResponse {
  meetingId: number;
  meetingSeriesId: number;
  title: string;
  description: string | null;
  location: string | null;
  startTime: string; // "2025-02-15T14:00:00"
  endTime: string; // "2025-02-15T15:30:00"
  durationMinutes: number;
  color: MeetingColor;
  meetingType: MeetingType;
  isIndividuallyModified: boolean;
  dayOfWeek: DayOfWeek | null;
  creatorName: string;
  teamRoomId: number;
  participants: MeetingParticipant[];
  canModify: boolean;
}

// ========== 회의 수정 ==========

export type UpdateScope = 'SINGLE' | 'THIS_AND_FUTURE';

export interface UpdateMeetingRequest {
  title: string;
  description: string;
  location: string;
  startDate?: string; // YYYY-MM-DD (scope=SINGLE 시 필수)
  dayOfWeek?: DayOfWeek; // (scope=THIS_AND_FUTURE 시 필수)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  color: MeetingColor;
  participantUserIds: number[];
}

export interface UpdateMeetingResponse {
  scope: UpdateScope;
  updatedMeetingCount: number;
  updatedMeetingIds: number[];
  skippedMeetingIds: number[];
}

// ========== 회의 삭제 ==========

export interface DeleteMeetingResponse {
  scope: UpdateScope;
  deletedMeetingCount: number;
  deletedMeetingIds: number[];
  seriesDeleted: boolean;
}
