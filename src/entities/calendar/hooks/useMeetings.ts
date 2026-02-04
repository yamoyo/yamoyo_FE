import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createMeeting,
  getMeetings,
} from '@/entities/calendar/api/meeting-api';
import type { CreateMeetingRequest } from '@/entities/calendar/api/meeting-dto';

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

/** 회의 생성 */
export function useCreateMeeting(teamRoomId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMeetingRequest) => createMeeting(teamRoomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings', teamRoomId] });
    },
  });
}
