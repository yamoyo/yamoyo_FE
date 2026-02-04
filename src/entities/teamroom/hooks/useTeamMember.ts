import { useQueries, useQuery } from '@tanstack/react-query';

import {
  getTeamMemberDetail,
  getTeamRoomMembers,
} from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoomMember } from '@/entities/teamroom/api/teamroom-dto';

/** 팀룸 멤버 목록 조회 */
export function useTeamRoomMembers(teamRoomId: number | null) {
  return useQuery({
    queryKey: ['teamroom', teamRoomId, 'members'],
    queryFn: () => getTeamRoomMembers(teamRoomId!),
    enabled: !!teamRoomId,
  });
}

/** 단일 팀원 상세 조회 */
export function useTeamMemberDetail(teamRoomId: number, memberId: number) {
  return useQuery({
    queryKey: ['teamroom', teamRoomId, 'members', memberId],
    queryFn: () => getTeamMemberDetail(teamRoomId, memberId),
    enabled: !!teamRoomId && !!memberId,
  });
}

/** 여러 팀원 상세 정보 병렬 조회 */
export function useTeamMembersDetails(
  teamRoomId: number,
  members: TeamRoomMember[] | undefined,
) {
  return useQueries({
    queries:
      members?.map((member) => ({
        queryKey: ['teamroom', teamRoomId, 'members', member.memberId],
        queryFn: () => getTeamMemberDetail(teamRoomId, member.memberId),
        enabled: !!teamRoomId && !!member.memberId,
      })) ?? [],
  });
}
