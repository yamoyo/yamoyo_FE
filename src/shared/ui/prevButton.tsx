/**
 * 뒤로가기 버튼 + 텍스트 나타내는 컴포넌트
 * @author junyeol
 * */
import { useNavigate } from 'react-router-dom';

interface PrevButtonProps {
  title: string;
}

export default function PrevButton({ title }: PrevButtonProps) {
  const navigate = useNavigate();

  return (
    <header className="relative flex h-[83px] items-center px-[31px]">
      <button onClick={() => navigate(-1)}>
        <img
          src="/assets/icons/arrow-left.png"
          width={10}
          height={18}
          alt="뒤로가기"
        />
      </button>
      <span className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-tx-default_3">
        {title}
      </span>
    </header>
  );
}
