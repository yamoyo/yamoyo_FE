import { create } from 'zustand';

import { Schedule } from './types';

interface ScheduleState {
  schedules: Schedule[];
  addSchedule: (schedule: Schedule) => void;
  removeSchedule: (id: string) => void;
  updateSchedule: (id: string, schedule: Partial<Schedule>) => void;
  getSchedulesByDate: (date: string) => Schedule[];
  getSchedulesByTeamId: (teamId: number) => Schedule[];
  getSchedulesByTeam: (teamId: number | null) => Schedule[];
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

  getSchedulesByDate: (date) => {
    return get().schedules.filter((s) => s.date === date);
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
