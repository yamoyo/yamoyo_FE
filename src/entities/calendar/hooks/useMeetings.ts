import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createMeeting,
  deleteMeeting,
  getMeeting,
  getMeetings,
  updateMeeting,
} from '@/entities/calendar/api/meeting-api';
import type {
  CreateMeetingRequest,
  UpdateMeetingRequest,
  UpdateScope,
} from '@/entities/calendar/api/meeting-dto';

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

/** 회의 상세 조회 */
export function useMeetingDetail(meetingId: number | null) {
  return useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId!),
    enabled: !!meetingId,
  });
}

/** 회의 수정 */
export function useUpdateMeeting(teamRoomId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      data,
      scope = 'SINGLE',
    }: {
      meetingId: number;
      data: UpdateMeetingRequest;
      scope?: UpdateScope;
    }) => updateMeeting(meetingId, data, scope),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meetings', teamRoomId] });
      queryClient.invalidateQueries({
        queryKey: ['meeting', variables.meetingId],
      });
    },
  });
}

/** 회의 삭제 */
export function useDeleteMeeting(teamRoomId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      scope = 'SINGLE',
    }: {
      meetingId: number;
      scope?: UpdateScope;
    }) => deleteMeeting(meetingId, scope),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meetings', teamRoomId] });
      queryClient.removeQueries({ queryKey: ['meeting', variables.meetingId] });
    },
  });
}
