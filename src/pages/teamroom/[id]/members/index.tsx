import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import type {
  LegacyTeamMember,
  TeamMember,
} from '@/entities/teamroom/api/teamroom-dto';
import TopBar from '@/shared/ui/header/TopBar';
import MemberListItem from '@/widgets/teamroom/members/ui/MemberListItem';

export default function TeamRoomMembersPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [members, setMembers] = useState<TeamMember[]>([]);

  // TODO: 실제 로그인 유저 ID로 교체
  const currentUserId = 1;

  useEffect(() => {
    if (!id) return;

    const fetchMembers = async () => {
      try {
        const data = await getTeamRoomDetail(Number(id));
        if (data) setMembers(data.members);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMembers();
  }, [id]);

  // TODO : 임시 방편으로 레거시 타입으로 지정 TeamMember로 바꿔야함
  const handleSettingClick = (member: LegacyTeamMember) => {
    navigate(`/teamroom/${id}/members/${member.id}`);
  };

  return (
    <>
      <TopBar title="팀원 멤버" />
      <section className="mt-5 flex flex-col items-start gap-4 px-6">
        <span className="text-body-1 text-tx-default_4">
          멤버 {members.length}
        </span>
        <ul className="flex w-full flex-col gap-4">
          {members.map((member) => {
            // TODO : 타입오류 방지를 위해 하드코딩 형태 API 호출 여부에 따라 수정될 예정
            const legacy = {
              id: member.userId,
              name: member.name,
              role: member.role,
              avatar: `/assets/character/char-${member.profileImageId}.png`,
              email: '-',
              major: '-',
              mbti: '-',
              joinedAt: '-',
            };
            return (
              <MemberListItem
                key={legacy.id}
                member={legacy}
                currentUserId={currentUserId}
                onSettingClick={handleSettingClick}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}
