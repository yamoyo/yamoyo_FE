import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamMember } from '@/entities/teamroom/model/types';
import MemberListItem from '@/widgets/teamroom/members/ui/MemberListItem';

export default function TeamRoomMembersPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [members, setMembers] = useState<TeamMember[]>([]);

  // TODO: 실제 로그인 유저 ID로 교체
  const currentUserId = 1;

  useEffect(() => {
    if (!id) return;
    getTeamRoom(id).then((data) => {
      if (data) setMembers(data.members);
    });
  }, [id]);

  const handleSettingClick = (member: TeamMember) => {
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
          {members.map((member) => (
            <MemberListItem
              key={member.id}
              member={member}
              currentUserId={currentUserId}
              onSettingClick={handleSettingClick}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
