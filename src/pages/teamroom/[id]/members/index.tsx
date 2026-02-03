import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import type { TeamMemberWithDetail } from '@/entities/teamroom/api/teamroom-dto';
import { useTeamMembersDetails } from '@/entities/teamroom/hooks/useTeamMember';
import TopBar from '@/shared/ui/header/TopBar';
import MemberListItem from '@/widgets/teamroom/members/ui/MemberListItem';

export default function TeamRoomMembersPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const teamRoomId = Number(id);

  // TODO: 실제 로그인 유저 ID로 교체
  const currentUserId = 1;

  // 팀룸 상세 조회 (members 기본 정보: userId, profileImageId, role, name)
  const { data: teamRoom } = useQuery({
    queryKey: ['teamroom', teamRoomId],
    queryFn: () => getTeamRoomDetail(teamRoomId),
    enabled: !!teamRoomId,
  });

  // 멤버별 상세 정보 병렬 조회 (major 등 추가 정보)
  const memberDetailQueries = useTeamMembersDetails(
    teamRoomId,
    teamRoom?.members,
  );

  // TeamMember + TeamMemberDetail 조합
  const membersWithDetail: TeamMemberWithDetail[] =
    teamRoom?.members.map((member, index) => {
      const detail = memberDetailQueries[index]?.data;
      return {
        userId: member.userId,
        name: member.name,
        profileImageId: member.profileImageId,
        role: member.role,
        major: detail?.major ?? '-',
      };
    }) ?? [];

  const isLoading = !teamRoom || memberDetailQueries.some((q) => q.isLoading);

  const handleSettingClick = (member: TeamMemberWithDetail) => {
    navigate(`/teamroom/${id}/members/${member.userId}`);
  };

  return (
    <>
      <TopBar title="팀원 멤버" />
      <section className="mt-5 flex flex-col items-start gap-4 px-6">
        <span className="text-body-1 text-tx-default_4">
          멤버 {membersWithDetail.length}
        </span>
        {isLoading ? (
          <p className="text-body-3 text-tx-default_4">로딩 중...</p>
        ) : (
          <ul className="flex w-full flex-col gap-4">
            {membersWithDetail.map((member) => (
              <MemberListItem
                key={member.userId}
                member={member}
                currentUserId={currentUserId}
                onSettingClick={handleSettingClick}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
