import { useParams } from 'react-router-dom';

import { useTeamMemberDetail } from '@/entities/teamroom/hooks/useTeamMember';
import {
  useChangeLeader,
  useKickMember,
  useTeamRoomDetail,
} from '@/entities/teamroom/hooks/useTeamRoom';
import { isLeader } from '@/entities/teamroom/lib/is-leader';
import TopBar from '@/shared/ui/header/TopBar';
import MemberActionButtons from '@/widgets/teamroom/members/member/ui/MemberActionButtons';
import MemberInfoSection from '@/widgets/teamroom/members/member/ui/MemberInfoSection';
import MemberProfileSection from '@/widgets/teamroom/members/member/ui/MemberProfileSection';

export default function TeamRoomMemberPage() {
  const { id, memberId } = useParams<{ id: string; memberId: string }>();
  const teamRoomId = Number(id);
  const memberIdNum = Number(memberId);

  // 팀룸 상세 조회 (myRole 포함)
  const { data: teamRoom } = useTeamRoomDetail(teamRoomId);

  // 멤버 상세 조회 (모든 정보 포함)
  const { data: memberDetail } = useTeamMemberDetail(teamRoomId, memberIdNum);

  const { mutate: delegateLeader } = useChangeLeader(teamRoomId);
  const { mutate: expelMember } = useKickMember(teamRoomId);

  // 현재 로그인한 유저가 팀장인지 확인
  const isCurrentUserLeader = teamRoom?.myRole
    ? isLeader(teamRoom.myRole)
    : false;

  const handleDelegateLeader = () => {
    if (confirm(`${memberDetail?.name}님에게 방장을 위임하시겠습니까?`)) {
      delegateLeader(memberIdNum);
    }
  };

  const handleExpelMember = () => {
    if (confirm(`${memberDetail?.name}님을 팀에서 방출하시겠습니까?`)) {
      expelMember(memberIdNum);
    }
  };

  if (!memberDetail) return null;

  // 개별 팀원 이미지 조회가 불가능하여 팀룸 멤버 데이터에서 이미지를 뽑아와서 할당
  const teamRoomMember = teamRoom?.members.find(
    (member) => member.userId === memberDetail.userId,
  );
  let profileImageId = memberDetail.profileImageId;
  if (!profileImageId) {
    profileImageId = teamRoomMember?.profileImageId ?? 1;
  }

  return (
    <>
      <TopBar title="프로필 관리" />
      <MemberProfileSection
        avatar={`/assets/character/char-${profileImageId}.png`}
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
