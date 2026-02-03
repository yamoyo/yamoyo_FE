import { cn } from '@/shared/config/tailwind/cn';
import ModalDim from '@/shared/ui/modal/ModalDim';

import { useModalStore } from './model/modal-store';
import { ChoiceModalOptions } from './model/types';

/** 두 가지 선택지 중 하나를 고르는 모달
 *
 * - density: 모달 내 상하 패딩 크기 설정 (comfortable: 30px, compact: 22px)
 * - Figma에서 똑같은 디자인의 모달이지만 상하 패딩에 따라 두 가지 컴포넌트로 나누어져 있어, density를 통해 패딩을 조절할 수 있게 함
 *
 */
export default function ChoiceModal({
  title,
  description,
  leftLabel,
  rightLabel,
  onClickLeftBtn,
  onClickRightBtn,
  density = 'compact',
  rightBtnClassName,
}: ChoiceModalOptions) {
  const verticalPaddingClass =
    density === 'comfortable' ? 'py-[30px]' : 'py-[22px]';

  const closeModal = useModalStore((s) => s.closeModal);

  const handleOnClickLeftBtn = () => {
    if (onClickLeftBtn) onClickLeftBtn();
    closeModal();
  };

  const handleOnClickRightBtn = () => {
    onClickRightBtn();
    closeModal();
  };

  return (
    <ModalDim>
      <div
        className={cn(
          'flex w-[340px] flex-col items-center rounded-xl bg-white px-[14px] text-center',
          verticalPaddingClass,
        )}
      >
        <div className="mb-5 space-y-[10px]">
          <h2 className="text-title-2 text-tx-default_black">{title}</h2>
          <p className="whitespace-pre-line text-body-5 text-tx-default_5">
            {description}
          </p>
        </div>

        <div className="flex w-full gap-2.5">
          <button
            type="button"
            onClick={handleOnClickLeftBtn}
            className="h-[55px] flex-1 rounded-lg bg-tx-default_3 text-body-2 text-tx-default_5"
          >
            {leftLabel}
          </button>
          <button
            type="button"
            onClick={handleOnClickRightBtn}
            className={cn(
              'h-[55px] flex-1 rounded-lg bg-textfiled-line_error text-body-2 text-tx-default',
              rightBtnClassName,
            )}
          >
            {rightLabel}
          </button>
        </div>
      </div>
    </ModalDim>
  );
}
