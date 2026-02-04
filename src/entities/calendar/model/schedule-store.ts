import { create } from 'zustand';

import { CreateScheduleFormData } from './types';

/** 로컬 일정 (일정 생성 API 연동 전 임시 사용) */
type LocalSchedule = CreateScheduleFormData & { id: string };

interface ScheduleState {
  schedules: LocalSchedule[];
  addSchedule: (schedule: LocalSchedule) => void;
  removeSchedule: (id: string) => void;
  updateSchedule: (id: string, schedule: Partial<LocalSchedule>) => void;
  getSchedulesByDate: (startDate: string) => LocalSchedule[];
  getSchedulesByTeamId: (teamId: number) => LocalSchedule[];
  getSchedulesByTeam: (teamId: number | null) => LocalSchedule[];
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  schedules: [],

  addSchedule: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, schedule],
    })),

  removeSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((s) => s.id !== id),
    })),

  updateSchedule: (id, updatedFields) =>
    set((state) => ({
      schedules: state.schedules.map((s) =>
        s.id === id ? { ...s, ...updatedFields } : s,
      ),
    })),

  getSchedulesByDate: (startDate) => {
    return get().schedules.filter((s) => s.startDate === startDate);
  },

  getSchedulesByTeamId: (teamId) => {
    return get().schedules.filter((s) => s.teamId === teamId);
  },

  getSchedulesByTeam: (teamId: number | null) => {
    const schedules = get().schedules;
    return teamId === null
      ? schedules
      : schedules.filter((s) => s.teamId === teamId);
  },
}));
