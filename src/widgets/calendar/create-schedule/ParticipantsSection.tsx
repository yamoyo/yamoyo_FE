import { TeamMember } from '@/shared/constants/mock-team-members';

interface ParticipantsSectionProps {
  selectedMembers: TeamMember[];
  onOpenSheet: () => void;
  onRemove: (id: number) => void;
}

export default function ParticipantsSection({
  selectedMembers,
  onOpenSheet,
  onRemove,
}: ParticipantsSectionProps) {
  return (
    <div>
      <label className="mb-2 flex items-center justify-between text-sm text-white">
        <span>참석자</span>
        <button
          type="button"
          onClick={onOpenSheet}
          className="text-xs text-purple-400"
        >
          추가하기
        </button>
      </label>
      <div className="h-24 overflow-y-auto rounded-lg bg-bg-textfiled px-4 pr-3">
        {selectedMembers.length > 0 && (
          <div className="grid h-full grid-cols-3 content-center gap-2">
            {selectedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-1 rounded-full border border-[#4C5377] bg-transparent px-2 py-1"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F3453]">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-4 w-4 object-contain"
                    draggable="false"
                  />
                </div>
                <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-white">
                  {member.name}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(member.id)}
                  className="flex h-4 w-4 items-center justify-center"
                  aria-label={`${member.name} 제거`}
                >
                  <img
                    src="/assets/icons/x-circle.svg"
                    alt=""
                    className="h-3 w-3"
                    aria-hidden="true"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
