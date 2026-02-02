import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import type { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import { isLeader } from '@/entities/teamroom/lib/is-leader';
import MemberProfileSection from '@/widgets/teamroom/members/member/ui/MemberProfileSection';
import MemberInfoSection from '@/widgets/teamroom/members/member/ui/MemberInfoSection';
import MemberActionButtons from '@/widgets/teamroom/members/member/ui/MemberActionButtons';

export default function TeamRoomMemberPage() {
  const { id, memberId } = useParams<{ id: string; memberId: string }>();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isCurrentUserLeader, setIsCurrentUserLeader] = useState(false);

  // TODO: 실제 로그인 유저 ID로 교체
  const currentUserId = 1;

  // 1. 팀룸 ID, 멤버 ID를 가져온다.
  // 2. 팀룸 ID를 이용해 팀룸 전체 데이터를 가져온다.
  // 3. 팀룸의 members 배열에서 멤버 ID와 일치하는 멤버를 찾는다.
  // 4. 찾은 멤버를 setMember에서 상태로 저장
  // 5. 현재 유저가 팀장인지 확인
  // TODO (준열) : 불필요하게 팀 전체 데이터를 가져오므로 향후에 1명에 대한 데이터 페칭 API가 있어야 할 듯
  useEffect(() => {
    if (!id || !memberId) return;

    const fetchMember = async () => {
      try {
        const data = await getTeamRoomDetail(Number(id));
        if (!data) return;

        const found = data.members.find(
          (m: TeamMember) => m.userId === Number(memberId),
        );
        if (found) setMember(found);

        const leader = data.members.find((m: TeamMember) => isLeader(m.role));
        setIsCurrentUserLeader(leader?.userId === currentUserId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
  }, [id, memberId, currentUserId]);

  if (!member) return null;

  const handleDelegateLeader = () => {
    // TODO: 방장 위임 로직
  };

  const handleExpelMember = () => {
    // TODO: 팀원 방출 로직
  };

  // TODO: 멤버 상세 API가 추가되면 email, major, mbti, joinedAt 필드 연결 필요
  return (
    <>
      <TopBar title="프로필 관리" />
      <MemberProfileSection
        avatar={`/assets/profile/${member.profileImageId}.png`}
        name={member.name}
      />
      <MemberInfoSection
        name={member.name}
        email="-"
        major="-"
        mbti="-"
        joinedAt="-"
      />
      <MemberActionButtons
        isLeader={isCurrentUserLeader}
        onDelegateLeader={handleDelegateLeader}
        onExpelMember={handleExpelMember}
      />
    </>
  );
}
