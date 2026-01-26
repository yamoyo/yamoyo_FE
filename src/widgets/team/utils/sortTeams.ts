import { TeamRoom } from '../model/types';

export type SortType = 'latest' | 'deadline';

const parseDday = (dday: string): number => {
  const sign = dday.includes('+') ? -1 : 1;
  const number = Number(dday.replace(/D[-+]/, ''));
  return sign * number;
};

export function sortTeams(teams: TeamRoom[], sortType: SortType): TeamRoom[] {
  if (sortType === 'latest') {
    // 최신순 (날짜 내림차순)
    return [...teams].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  if (sortType === 'deadline') {
    // 마감임박순 (D-day 오름차순)
    return [...teams].sort((a, b) => parseDday(a.dday) - parseDday(b.dday));
  }

  return teams;
}
