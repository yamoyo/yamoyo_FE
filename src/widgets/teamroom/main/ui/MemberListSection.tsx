import { useState } from 'react';
import type { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import MemberItem from './MemberItem';
import { useHorizontalDragScroll } from '@/shared/hooks/useHorizontalDragScroll';

interface MemberListSectionProps {
  members: TeamMember[];
  onAddMember: () => void;
}

export default function MemberListSection({
  members,
  onAddMember,
}: MemberListSectionProps) {
  const { bind } = useHorizontalDragScroll<HTMLUListElement>();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="mx-6 my-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-body-1 text-tx-default">팀원</span>
          <span className="size-6 gap-[10px] rounded-lg border border-bg-card bg-bg-textfiled text-body-1 text-bg-secondary_2 flex-col-center">
            {members.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="px-[14px] py-[6px] flex-center"
          >
            <img
              src="/assets/icons/arrow-left.svg"
              width={10}
              height={18}
              alt="펼치기/접기"
              className={isOpen ? '-rotate-90' : 'rotate-90'}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <ul
          {...bind}
          className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6"
        >
          {members.map((member) => (
            <MemberItem key={member.userId} member={member} />
          ))}
          <li className="flex shrink-0 flex-col items-center gap-2">
            <button
              type="button"
              onClick={onAddMember}
              className="h-16 w-16 select-none flex-center"
            >
              <img
                src="/assets/icons/plus.svg"
                width={64}
                height={64}
                alt="멤버 추가"
                draggable="false"
              />
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}
