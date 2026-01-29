import BottomSheet from '@/shared/ui/BottomSheet';
import LinkCopyIcon from '@/shared/assets/icons/link-copy.svg?react';
import KaKaoLinkIcon from '@/shared/assets/login/kakao.svg?react';

interface AddMemberBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShareButtonProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description?: string;
  onClick: () => void;
}

function ShareButton({
  icon,
  iconBgColor,
  title,
  description,
  onClick,
}: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 self-stretch rounded-full bg-bg-card"
    >
      <div
        className={`h-[60px] w-[60px] rounded-full p-[12.5px] flex-center ${iconBgColor}`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-body-6 text-tx-default">{title}</span>
        {description && (
          <span className="text-body-9 text-tx-default_4">{description}</span>
        )}
      </div>
    </button>
  );
}

export default function AddMemberBottomSheet({
  isOpen,
  onClose,
}: AddMemberBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="flex flex-col gap-[20px] px-6 pb-[30px]"
    >
      <div className="flex flex-col">
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
        <h2 className="-mt-[10px] text-title-3 text-tx-default">
          함께하고 있는 팀 멤버를 초대하세요
        </h2>
      </div>

      <ShareButton
        icon={
          <LinkCopyIcon className="h-[26.67px] w-[26.67px] text-tx-default" />
        }
        iconBgColor="bg-bg-bt-disabled"
        title="링크복사"
        description="링크로 팀원과 공유하세요."
        onClick={() => {}}
      />

      <ShareButton
        icon={<KaKaoLinkIcon className="h-[33.778px] w-[32px]" />}
        iconBgColor="bg-[#F7E115]"
        title="카카오톡으로 보내기"
        onClick={() => {}}
      />
    </BottomSheet>
  );
}
