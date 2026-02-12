import { useEffect, useMemo, useState } from 'react';

import type { TeamRoomMember } from '@/entities/teamroom/api/teamroom-dto';
import BottomSheet from '@/shared/ui/BottomSheet';

interface ParticipantSelectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamRoomMember[];
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

  const handleToggle = (userId: number) => {
    setCurrentSelected((prev) =>
      prev.includes(userId)
        ? prev.filter((item) => item !== userId)
        : [...prev, userId],
    );
  };

  const handleConfirm = () => {
    onConfirm(currentSelected);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="팀원 멤버">
      <p className="mb-4 text-center text-body-6 text-[#BEC4DE]">
        프로필을 선택하면 일정 참가자로 추가할 수 있습니다.
      </p>

      <div className="mb-1 text-body-5 text-tx-default">
        멤버 {members.length}
      </div>

      <ul className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">
        {members.map((member) => {
          const isSelected = selectedSet.has(member.userId);
          return (
            <li
              key={member.userId}
              className={`flex items-center gap-3 rounded-xl py-3 pl-2 pr-3 transition-all ${
                isSelected ? 'text-white' : 'text-gray-300 opacity-50'
              }`}
            >
              <div className="flex size-[55px] items-center justify-center rounded-full bg-[#2D314A]">
                <img
                  src={`/assets/character/char-${member.profileImageId}.png`}
                  alt={member.name}
                  className="h-8 w-8 object-contain"
                  draggable="false"
                />
              </div>
              <button
                type="button"
                onClick={() => handleToggle(member.userId)}
                className="flex flex-1 flex-col items-start gap-[3px]"
              >
                <span className="text-[15px] font-medium">{member.name}</span>
                <span className="text-[14px] font-normal text-tx-default_4">
                  {member.major}
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
