/**
 * 뒤로가기 버튼 + 텍스트 나타내는 컴포넌트
 * @author junyeol
 *
 * @param {string} title - 표시할 페이지 제목
 * @param {() => void} [onBack] - 커스텀 뒤로가기 동작. 미제공 시 navigate(-1) 사용
 *
 * @example
 * // 기본 사용 (일반 뒤로가기)
 * <PrevButton title="마이페이지" />
 *
 * @example
 * // 커스텀 뒤로가기 (온보딩, 결제 플로우 등)
 * <PrevButton
 *   title="온보딩"
 *   onBack={() => navigate('/step2', { replace: true })}
 * />
 *
 * */

import { useNavigate } from 'react-router-dom';

interface PrevButtonProps {
  title: string;
  onBack?: () => void;
}

// 사용
export default function PrevButton({ title, onBack }: PrevButtonProps) {
  const navigate = useNavigate();
  const handleBack = () => onBack?.() ?? navigate(-1);

  return (
    <header className="relative flex h-[83px] select-none items-center px-[31px]">
      <button onClick={handleBack} aria-label="뒤로가기">
        <img
          src="/assets/icons/arrow-left.svg"
          width={10}
          height={18}
          alt=""
          draggable="false"
        />
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-tx-default_3">
        {title}
      </span>
    </header>
  );
}
