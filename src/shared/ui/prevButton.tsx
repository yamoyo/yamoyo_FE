/**
 * 뒤로가기 버튼 + 텍스트 나타내는 컴포넌트
 * @author junyeol
 * */
import { useNavigate } from 'react-router-dom';

interface PrevButtonProps {
  title: string;
  onBack?: () => void;
}

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
