import { ReactNode, useEffect } from 'react';

interface ModalDimProps {
  children: ReactNode;
  onClickOutside?: () => void; // 딤 영역 클릭 시 닫기
}

export default function ModalDim({ children, onClickOutside }: ModalDimProps) {
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
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/25"
      onClick={onClickOutside}
    >
      {/* 모달 클릭 시 onClickOutside 작동 방지 */}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
