import { useEffect, useMemo, useState } from 'react';
import BottomSheet from '@/shared/ui/BottomSheet';
import { TeamMember } from '@/shared/constants/mock-team-members';

interface ParticipantSelectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  selectedIds: number[];
  onConfirm: (selectedIds: number[]) => void;
}

export default function ParticipantSelectSheet({
  isOpen,
  onClose,
  members,
  selectedIds,
  onConfirm,
}: ParticipantSelectSheetProps) {
  const [currentSelected, setCurrentSelected] = useState<number[]>(selectedIds);

  useEffect(() => {
    if (isOpen) {
      setCurrentSelected(selectedIds);
    }
  }, [isOpen, selectedIds]);

  const selectedSet = useMemo(
    () => new Set(currentSelected),
    [currentSelected],
  );

  const handleToggle = (id: number) => {
    setCurrentSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    onConfirm(currentSelected);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={`팀원 멤버 ${members.length}`}
    >
      <p className="mb-4 text-center text-body-6 text-tx-default">
        프로필을 선택하면 일정 참가자로 추가할 수 있습니다.
      </p>

      <div className="mb-1 text-body-5 text-tx-default">
        멤버 ({members.length})
      </div>

      <ul className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">
        {members.map((member) => {
          const isSelected = selectedSet.has(member.id);
          return (
            <li
              key={member.id}
              className={`flex items-center gap-3 rounded-xl py-3 pl-2 pr-3 transition-colors ${
                isSelected ? 'bg-bg-textfiled text-white' : 'text-gray-300'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D314A]">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-7 w-7 object-contain"
                  draggable="false"
                />
              </div>
              <button
                type="button"
                onClick={() => handleToggle(member.id)}
                className="flex flex-1 flex-col items-start gap-0"
              >
                <span className="text-sm font-semibold leading-[1.1]">
                  {member.name}
                </span>
                <span className="text-xs leading-[1.1] text-gray-400">
                  {member.role}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={handleConfirm}
        className="mt-6 w-full rounded-xl bg-bg-primary py-4 font-bold text-white"
      >
        설정 완료
      </button>
    </BottomSheet>
  );
}
