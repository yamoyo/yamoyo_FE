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
}

export interface MeetingListResponse {
  year: number;
  month: number;
  meetings: MeetingSummary[];
}
