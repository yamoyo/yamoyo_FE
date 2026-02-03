import { useState } from 'react';

import BottomSheet from '@/shared/ui/BottomSheet';
import { TeamRoom } from '@/widgets/teamroom/model/types';

interface TeamRoomSelectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  teamRooms: TeamRoom[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

export default function TeamRoomSelectSheet({
  isOpen,
  onClose,
  teamRooms,
  selectedId,
  onSelect,
}: TeamRoomSelectSheetProps) {
  const [currentSelected, setCurrentSelected] = useState(selectedId);

  const handleChange = () => {
    if (currentSelected) {
      onSelect(currentSelected);
      onClose();
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      titleClassName="pt-6 pb-6"
      title={
        <p className="mt-4 text-center text-[18px] font-bold leading-7">
          <span className="text-textfiled-line_focus">원하는 팀룸</span>
          <span className="text-tx-default">의</span>
          <br />
          <span className="text-tx-default">일정확인이 가능합니다.</span>
        </p>
      }
    >
      <ul className="flex flex-col gap-3">
        {teamRooms.map((room) => (
          <li
            key={room.id}
            className="flex items-center gap-4 rounded-xl bg-bg-textfiled pr-4"
          >
            <img
              src={`/assets/banner/banner-${room.imgId}.png`}
              alt={room.name}
              className="h-12 w-12 rounded-[10px] object-cover"
            />
            <span className="flex-1 text-[14px] font-bold leading-[21px] text-tx-default">
              {room.name}
            </span>
            <button
              onClick={() =>
                setCurrentSelected(
                  currentSelected === room.id ? undefined : room.id,
                )
              }
              className="relative h-6 w-6"
            >
              <img
                src="/assets/icons/check-inactive.svg"
                alt="선택"
                width={24}
                height={24}
                draggable="false"
                className={`absolute inset-0 transition-opacity duration-200 ${
                  currentSelected === room.id ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <img
                src="/assets/icons/check-active.svg"
                alt="선택됨"
                width={24}
                height={24}
                draggable="false"
                className={`absolute inset-0 transition-opacity duration-200 ${
                  currentSelected === room.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleChange}
        className="mt-6 w-full rounded-xl bg-bg-primary py-4 font-bold text-white"
      >
        변경하기
      </button>
    </BottomSheet>
  );
}
