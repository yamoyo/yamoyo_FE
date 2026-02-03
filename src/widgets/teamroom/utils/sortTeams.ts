import type { TeamRoomListItem } from '@/entities/teamroom/api/teamroom-dto';

export type SortType = 'latest' | 'deadline';

const toTime = (value: string) => new Date(value).getTime();

export function sortTeams(
  teams: TeamRoomListItem[],
  sortType: SortType,
): TeamRoomListItem[] {
  if (sortType === 'latest') {
    // 최신순 (날짜 내림차순)
    return [...teams].sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt));
  }

  if (sortType === 'deadline') {
    // 마감임박순 (deadline 오름차순)
    return [...teams].sort((a, b) => toTime(a.deadline) - toTime(b.deadline));
  }

  return teams;
}
