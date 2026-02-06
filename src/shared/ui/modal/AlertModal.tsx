import ModalDim from '@/shared/ui/modal/ModalDim';

import { useModalStore } from './model/modal-store';
import { AlertModalOptions } from './model/types';

/** 단일 확인 버튼만 있는 알림 모달 */
export default function AlertModal({
  title,
  buttonLabel,
  onClickBtn,
}: AlertModalOptions) {
  const closeModal = useModalStore((s) => s.closeModal);

  const handleClick = () => {
    onClickBtn?.();
    closeModal();
  };

  return (
    <ModalDim>
      <div className="flex w-[340px] flex-col items-center rounded-xl bg-white px-[14px] py-[22px] text-center">
        <h2 className="mb-5 text-title-2 text-tx-default_black">{title}</h2>
        <button
          type="button"
          onClick={handleClick}
          className="h-12 w-[194px] rounded-lg bg-tx-default_black text-body-2 text-white"
        >
          {buttonLabel}
        </button>
      </div>
    </ModalDim>
  );
}
