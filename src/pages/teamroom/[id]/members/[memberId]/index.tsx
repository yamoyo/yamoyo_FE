import { useParams } from 'react-router-dom';

import { useTeamMemberDetail } from '@/entities/teamroom/hooks/useTeamMember';
import { isLeader } from '@/entities/teamroom/lib/is-leader';
import TopBar from '@/shared/ui/header/TopBar';
import MemberActionButtons from '@/widgets/teamroom/members/member/ui/MemberActionButtons';
import MemberInfoSection from '@/widgets/teamroom/members/member/ui/MemberInfoSection';
import MemberProfileSection from '@/widgets/teamroom/members/member/ui/MemberProfileSection';

export default function TeamRoomMemberPage() {
  const { id, memberId } = useParams<{ id: string; memberId: string }>();
  const teamRoomId = Number(id);
  const memberIdNum = Number(memberId);

  // 멤버 상세 조회 (모든 정보 포함)
  const { data: memberDetail } = useTeamMemberDetail(teamRoomId, memberIdNum);

  // 현재 유저가 팀장인지 확인
  const isCurrentUserLeader = memberDetail?.role
    ? isLeader(memberDetail.role)
    : false;

  const handleDelegateLeader = () => {
    // TODO: 방장 위임 로직
  };

  const handleExpelMember = () => {
    // TODO: 팀원 방출 로직
  };

  if (!memberDetail) return null;

  return (
    <>
      <TopBar title="프로필 관리" />
      <MemberProfileSection
        avatar={`/assets/character/char-${memberDetail.profileImageId}.png`}
        name={memberDetail.name}
      />
      <MemberInfoSection
        name={memberDetail.name}
        email={memberDetail.email}
        major={memberDetail.major}
        mbti={memberDetail.mbti}
        joinedAt={memberDetail.joinedAt.split('T')[0]}
      />
      <MemberActionButtons
        isLeader={isCurrentUserLeader}
        onDelegateLeader={handleDelegateLeader}
        onExpelMember={handleExpelMember}
      />
    </>
  );
}
