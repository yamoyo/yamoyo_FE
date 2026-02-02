import type { LegacyTeamMember } from '@/entities/teamroom/api/teamroom-dto';
import { isLeader } from '@/entities/teamroom/lib/is-leader';
import SettingIcon from '@/shared/assets/icons/setting.svg?react';

interface MemberListItemProps {
  member: LegacyTeamMember;
  currentUserId?: number;
  onSettingClick?: (member: LegacyTeamMember) => void;
}

export default function MemberListItem({
  member,
  currentUserId,
  onSettingClick,
}: MemberListItemProps) {
  const isCurrentUser = member.id === currentUserId;
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* 프로필 이미지 */}
        <div className="relative h-16 w-16 flex-center">
          <img
            src="/assets/character/char-bg.png"
            width={64}
            height={64}
            alt="프로필 배경"
            draggable={false}
          />
          <img
            src={member.avatar}
            width={36}
            height={26}
            alt={member.name}
            className="absolute"
            draggable={false}
          />
          {isLeader(member.role) && (
            <img
              src="/assets/icons/leader.svg"
              alt="팀장"
              width={16}
              height={16}
              className="absolute bottom-1 right-1"
            />
          )}
        </div>

        {/* 이름, 직무 */}
        <div className="flex flex-col gap-0.5">
          <span className="text-body-4 text-tx-default">{member.name}</span>
          <span className="text-body-6 text-tx-default_4">{member.major}</span>
        </div>
      </div>

      {/* 설정 버튼 - 자기 자신이 아닐 때만 표시 */}
      {!isCurrentUser && (
        <button
          type="button"
          className="p-[10px] text-tx-default_4"
          aria-label="멤버 설정"
          onClick={() => onSettingClick?.(member)}
        >
          <SettingIcon width={20} height={20} />
        </button>
      )}
    </li>
  );
}
