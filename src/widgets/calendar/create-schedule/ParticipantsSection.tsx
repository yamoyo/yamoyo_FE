import type { LegacyTeamMember } from '@/entities/teamroom/api/teamroom-dto';

interface ParticipantsSectionProps {
  selectedMembers: LegacyTeamMember[];
  onOpenSheet: () => void;
  onRemove: (id: number) => void;
}

export default function ParticipantsSection({
  selectedMembers,
  onOpenSheet,
  onRemove,
}: ParticipantsSectionProps) {
  return (
    <div className="flex flex-col items-start gap-2 self-stretch">
      <label className="flex items-center justify-between self-stretch text-[12px] font-medium text-white">
        <span>참석자</span>
        <button
          type="button"
          onClick={onOpenSheet}
          className="text-body-6 text-textfiled-line_focus"
        >
          추가하기
        </button>
      </label>
      <div className="h-36 overflow-y-auto">
        {selectedMembers.length > 0 && (
          <div className="grid grid-cols-3 gap-[10px]">
            {selectedMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-1 items-center gap-[10px] self-stretch rounded-[52px] border border-bd-textfiled_line px-[11px] py-[6px]"
              >
                <div className="flex items-center gap-1">
                  <div className="flex size-[25px] items-center justify-center rounded-full bg-bg-textfiled">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="size-4 object-contain"
                      draggable="false"
                    />
                  </div>
                  <span className="min-w-0 truncate text-[12px] font-medium text-white">
                    {member.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(member.id)}
                  className="h-4 w-4 flex-center"
                  aria-label={`${member.name} 제거`}
                >
                  <img
                    src="/assets/icons/cancel.svg"
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
