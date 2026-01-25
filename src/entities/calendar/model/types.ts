export interface Schedule {
  id: string;
  teamId: number;
  title: string;
  color: string;
  type: 'none' | 'weekly';
  description?: string;
  date: string; // 2026-01-27
  time?: string; // 20:00-21:30
  location?: string;
  participants: string[];
}

export const SCHEDULE_COLORS = [
  { id: 'gray', hex: '#6B7280', name: '회색' },
  { id: 'yellow', hex: '#FCD34D', name: '노랑' },
  { id: 'purple', hex: '#A78BFA', name: '보라' },
  { id: 'blue', hex: '#60A5FA', name: '파랑' },
  { id: 'green', hex: '#34D399', name: '초록' },
  { id: 'pink', hex: '#F472B6', name: '분홍' },
  { id: 'orange', hex: '#FB923C', name: '주황' },
] as const;

export type ScheduleColorId = (typeof SCHEDULE_COLORS)[number]['id'];

export type CreateScheduleFormData = {
  teamId: number;
  title: string;
  color: string;
  type: 'none' | 'weekly';
  description?: string;
  date: string;
  time?: string;
  location?: string;
  participants: string[];
};
