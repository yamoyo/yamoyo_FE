import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ModalDim from '@/shared/ui/modal/ModalDim';
import AddMemberBottomSheet from '@/widgets/teamroom/main/ui/AddMemberBottomSheet';

import { useModalStore } from './model/modal-store';
import { TeamRoomCreatedModalOptions } from './model/types';

export default function TeamRoomCreatedModal({
  teamRoomId,
  inviteLink,
}: TeamRoomCreatedModalOptions) {
  const navigate = useNavigate();
  const closeModal = useModalStore((s) => s.closeModal);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const handleShare = async () => {
    setIsAddMemberOpen(true);
  };

  const handleGoToTeamRoom = () => {
    closeModal();
    navigate(`/teamroom/${teamRoomId}`);
  };

  return (
    <>
      <ModalDim isActiveCloseModal={false}>
        <div className="relative flex w-[342px] flex-col items-center rounded-xl bg-white px-[14px] py-[30px] text-center">
          <img
            src="/assets/character/modal-char.png"
            width={80}
            height={70}
            alt=""
            className="pointer-events-none absolute -top-[68px] left-16 select-none"
            draggable="false"
          />
          <img
            src="/assets/character/char-9.png"
            width={55}
            height={40}
            alt=""
            className="pointer-events-none absolute -top-[40px] right-16 select-none"
            draggable="false"
          />

          <div className="mb-5 select-none space-y-[8px]">
            <h2
              className="text-title-2 text-tx-default_black"
              draggable="false"
            >
              팀룸 생성이 완료 !
            </h2>
            <p
              className="whitespace-pre-line text-body-5 text-tx-default_5"
              draggable="false"
            >
              함께한 팀원들을 초대해주세요
            </p>
          </div>

          <div className="flex w-full gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="h-[55px] flex-1 select-none gap-[10px] rounded-lg bg-[#E8E0FF] text-body-2 text-bg-primary flex-center"
            >
              공유하기
            </button>
            <button
              type="button"
              onClick={handleGoToTeamRoom}
              className="h-[55px] flex-1 select-none rounded-lg bg-bg-primary text-body-2 text-tx-default"
              draggable="false"
            >
              팀룸으로 이동
            </button>
          </div>
        </div>
      </ModalDim>
      <AddMemberBottomSheet
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        teamRoomId={Number(teamRoomId)}
        inviteLink={inviteLink}
        zIndex={1001}
      />
    </>
  );
}
