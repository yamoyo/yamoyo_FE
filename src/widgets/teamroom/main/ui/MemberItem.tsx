import type { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import { isLeader } from '@/entities/teamroom/lib/is-leader';

interface MemberItemProps {
  member: TeamMember;
  onClick?: () => void;
}

export default function MemberItem({ member, onClick }: MemberItemProps) {
  const isMemberLeader = isLeader(member.role);

  return (
    <li
      className={`flex shrink-0 select-none flex-col items-center gap-2 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="relative h-16 w-16 flex-center">
        <img
          src="/assets/character/char-bg.png"
          width={64}
          height={64}
          alt="프로필 이미지 배경"
          draggable={false}
        />
        <img
          src={`/assets/character/char-${member.profileImageId}.png`}
          width={36}
          height={26}
          alt={member.name}
          className="absolute"
          draggable={false}
        />
        {(isMemberLeader || member.status === 'ONLINE') && (
          <div className="absolute bottom-0.5 right-0.5 rounded-full bg-[#202540] p-0.5 flex-center">
            {isMemberLeader ? (
              <img
                src="/assets/icons/leader.svg"
                alt="leader"
                width={16}
                height={16}
              />
            ) : (
              <div className="h-4 w-4 rounded-full bg-ct-ch-8" />
            )}
          </div>
        )}
      </div>
      <span className="text-body-6 text-tx-default_3">{member.name}</span>
    </li>
  );
}
