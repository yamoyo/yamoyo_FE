import { useQuery } from '@tanstack/react-query';

import { getMeetings } from '@/entities/calendar/api/meeting-api';

/** 팀룸의 월별 회의 목록 조회 */
export function useMeetings(
  teamRoomId: number | null,
  year: number,
  month: number,
) {
  return useQuery({
    queryKey: ['meetings', teamRoomId, year, month],
    queryFn: () => getMeetings(teamRoomId!, year, month),
    enabled: !!teamRoomId,
  });
}
