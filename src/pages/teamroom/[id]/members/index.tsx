import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { getTeamRoom } from '@/entities/teamroom/api/teamroom-api';
import type { TeamMember } from '@/entities/teamroom/model/types';
import MemberListItem from '@/widgets/teamroom/members/ui/MemberListItem';

export default function TeamRoomMembersPage() {
  const { id } = useParams<{ id: string }>();
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    if (!id) return;
    getTeamRoom(id).then((data) => {
      if (data) setMembers(data.members);
    });
  }, [id]);

  const handleSettingClick = (_member: TeamMember) => {
    // TODO: 멤버 설정 페이지로 이동
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
              onSettingClick={handleSettingClick}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
