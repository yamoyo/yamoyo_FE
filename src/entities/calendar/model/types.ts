import type { MeetingColor } from '@/entities/calendar/api/meeting-dto';

/** API MeetingColor → hex 변환 맵 */
export const MEETING_COLOR_MAP: Record<MeetingColor, string> = {
  PURPLE: '#A78BFA',
  YELLOW: '#FCD34D',
  PALE_PINK: '#F776F7',
  BLUE: '#60A5FA',
  MINT: '#5DFBDB',
  PINK: '#EF4B8A',
  ORANGE: '#FB923C',
};

/** 일정 생성 폼에서 사용하는 색상 목록 (PURPLE 제외 - INITIAL_REGULAR 전용) */
export const SCHEDULE_COLORS = [
  { id: 'YELLOW', hex: '#FCD34D', name: '노랑' },
  { id: 'PALE_PINK', hex: '#F776F7', name: '연분홍' },
  { id: 'BLUE', hex: '#60A5FA', name: '파랑' },
  { id: 'MINT', hex: '#5DFBDB', name: '민트' },
  { id: 'PINK', hex: '#EF4B8A', name: '분홍' },
  { id: 'ORANGE', hex: '#FB923C', name: '주황' },
] as const;

export type ScheduleColorId = (typeof SCHEDULE_COLORS)[number]['id'];

export type CreateScheduleFormData = {
  teamId: number;
  title: string;
  color: ScheduleColorId;
  isRecurring: boolean;
  description?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location?: string;
  participantUserIds: number[];
};
