import { ReactNode, useEffect } from 'react';

import { useModalStore } from './model/modal-store';

interface Props {
  children: ReactNode;
  isActiveCloseModal?: boolean;
}

/** 모달 배경 딤 컴포넌트
 *
 * - isActiveCloseModal: 딤 영역 클릭 시 모달 닫기가 활성화 되는지 여부
 *
 */
export default function ModalDim({
  children,
  isActiveCloseModal = true,
}: Props) {
  const onCloseModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 모달 열릴 때 body 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 flex-center"
      onClick={isActiveCloseModal ? onCloseModal : undefined}
    >
      {/* 모달 클릭 시 onClickOutside 작동 방지 */}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
