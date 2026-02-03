import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getTeamRoomMembers } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoomMember } from '@/entities/teamroom/api/teamroom-dto';
import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser';
import TopBar from '@/shared/ui/header/TopBar';
import MemberListItem from '@/widgets/teamroom/members/ui/MemberListItem';

export default function TeamRoomMembersPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const teamRoomId = Number(id);

  const { data: currentUser } = useCurrentUser();
  const currentUserId = currentUser?.userId;

  // 팀룸 멤버 목록 조회 (major 포함)
  const { data: members, isLoading } = useQuery<TeamRoomMember[]>({
    queryKey: ['teamroom', teamRoomId, 'members'],
    queryFn: () => getTeamRoomMembers(teamRoomId),
    enabled: !!teamRoomId,
  });

  const handleSettingClick = (member: TeamRoomMember) => {
    navigate(`/teamroom/${id}/members/${member.memberId}`);
  };

  return (
    <>
      <TopBar title="팀원 멤버" />
      <section className="mt-5 flex flex-col items-start gap-4 px-6">
        <span className="text-body-1 text-tx-default_4">
          멤버 {members?.length ?? 0}
        </span>
        {isLoading ? (
          <p className="text-body-3 text-tx-default_4">로딩 중...</p>
        ) : (
          <ul className="flex w-full flex-col gap-4">
            {members?.map((member) => (
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
