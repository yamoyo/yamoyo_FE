import { useNavigate } from 'react-router-dom';

import type { TeamRoomDetail } from '@/entities/teamroom/api/teamroom-dto';
import {
  useDeleteTeamRoom,
  useLeaveTeamRoom,
} from '@/entities/teamroom/hooks/useTeamRoom';
import { isLeader as checkIsLeader } from '@/entities/teamroom/lib/is-leader';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import { cn } from '@/shared/config/tailwind/cn';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';
import BottomSheet from '@/shared/ui/BottomSheet';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

interface TeamRoomOptionsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  teamRoom: TeamRoomDetail | null;
}

export default function TeamRoomOptionsBottomSheet({
  isOpen,
  onClose,
  teamRoom,
}: TeamRoomOptionsBottomSheetProps) {
  const navigate = useNavigate();
  const openChoiceModal = useModalStore((state) => state.openChoiceModal);
  const openAlertModal = useModalStore((state) => state.openAlertModal);

  const bannerSrc =
    TEAMROOM_IMAGES.find((img) => img.id === teamRoom?.bannerImageId)?.src ??
    '';

  const leader = teamRoom?.members.find((member) => checkIsLeader(member.role));

  const isCurrentUserLeader = teamRoom?.myRole
    ? checkIsLeader(teamRoom.myRole)
    : false;

  const isOnlyMember = (teamRoom?.members.length ?? 0) <= 1;

  const leaveMutation = useLeaveTeamRoom();
  const deleteMutation = useDeleteTeamRoom(() => {
    openAlertModal({
      title: '팀룸이 삭제되었습니다.',
      buttonLabel: '확인',
      onClickBtn: () => {
        navigate('/home', { replace: true });
      },
    });
  });

  const handleLeaveTeamRoom = () => {
    onClose();
    openChoiceModal({
      title: '팀룸을 나가시겠습니까?',
      description: '다시 팀룸을 들어오려면 링크를\n새로 받아야합니다.',
      leftLabel: '취소',
      rightLabel: '나가기',
      onClickRightBtn: () => {
        if (teamRoom) leaveMutation.mutate(teamRoom.teamRoomId);
      },
    });
  };

  const handleDeleteTeamRoom = () => {
    onClose();
    openChoiceModal({
      title: '팀룸을 삭제하시겠습니까?',
      description:
        '삭제시 모든 멤버가 탈퇴되고 컨텐츠가\n영구 삭제되어 복구가 불가능합니다.',
      leftLabel: '취소',
      rightLabel: '삭제',
      onClickRightBtn: () => {
        if (teamRoom) deleteMutation.mutate(teamRoom.teamRoomId);
      },
    });
  };
  const setEditData = useTeamRoomEditStore((state) => state.setEditData);

  const handleEditTeamRoom = () => {
    onClose();
    if (teamRoom) {
      setEditData({
        bannerImageId: teamRoom.bannerImageId,
        title: teamRoom.title,
        description: teamRoom.description,
        deadline: teamRoom.deadline,
      });
    }
    navigate(`/teamroom/${teamRoom?.teamRoomId}/edit`);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="flex flex-col gap-[20px] px-6 pb-[30px]"
    >
      <div className="flex w-full flex-col items-start gap-10">
        <div className="flex w-full flex-col">
          <button
            onClick={onClose}
            className="h-10 w-10 self-end flex-center"
            aria-label="모달 닫기"
          >
            <img
              src="/assets/icons/cancel.svg"
              width={16}
              height={16}
              alt=""
              draggable="false"
            />
          </button>

          <div className="-mt-[10px] flex items-center gap-4">
            <img
              src={bannerSrc}
              alt="팀룸 배너"
              className="h-16 w-16 rounded-[3.879px] border-[0.97px] border-[#C7B2FF] object-cover [image-rendering:pixelated]"
            />
            <div className="flex flex-col gap-1">
              <span className="text-body-1 text-tx-default">
                {teamRoom?.title}의 팀룸
              </span>
              {leader && (
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/icons/leader-badge.svg"
                    alt="팀장"
                    width={15.83}
                    height={20}
                  />
                  <span className="line-height-[21px] text-[13px] font-bold text-tx-default_4">
                    {leader.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(`/teamroom/${teamRoom?.teamRoomId}/members`);
            }}
            className="flex items-center gap-4"
          >
            <img
              src="/assets/home/users.png"
              width={20}
              height={20}
              alt="팀원 목록"
            />
            <p className="text-body-4.1 text-tx-default">
              팀원 {teamRoom?.members.length ?? 1}
            </p>
          </button>

          <button
            type="button"
            onClick={handleEditTeamRoom}
            disabled={!isCurrentUserLeader}
            className={cn(
              'flex items-center gap-4',
              !isCurrentUserLeader && 'cursor-not-allowed opacity-40',
            )}
          >
            <img
              src="/assets/icons/teamroom-edit.svg"
              width={20}
              height={20}
              alt="팀룸 수정"
            />
            <p className="text-body-4.1 text-tx-default">편집</p>
          </button>

          <button
            type="button"
            onClick={handleLeaveTeamRoom}
            disabled={isOnlyMember}
            className={cn(
              'flex items-center gap-4',
              isOnlyMember && 'cursor-not-allowed opacity-40',
            )}
          >
            <img
              src="/assets/icons/teamroom-out.svg"
              width={20}
              height={20}
              alt="팀룸 나가기"
            />
            <p className="text-body-4.1 text-tx-default">팀룸 나가기</p>
          </button>

          <button
            type="button"
            onClick={handleDeleteTeamRoom}
            disabled={!isCurrentUserLeader}
            className={cn(
              'flex items-center gap-4',
              !isCurrentUserLeader && 'cursor-not-allowed opacity-40',
            )}
          >
            <img
              src="/assets/icons/teamroom-delete.svg"
              width={20}
              height={20}
              alt="팀룸 삭제"
            />
            <p className="text-body-4.1 text-tx-default">팀룸 삭제</p>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
