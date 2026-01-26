import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  /** 기본값: true — 뒤로가기 버튼 노출 여부 */
  showBackButton?: boolean;
  /** 기본값: 'arrow' — 뒤로가기 아이콘 타입 */
  backIcon?: 'arrow' | 'cancel';
  /** 커스텀 뒤로가기 로직. 없으면 navigate(-1) */
  onBack?: () => void;
}

/**
 * 상단 바 컴포넌트
 *
 * @param {string} title - 표시할 페이지 제목
 * @param {boolean} [showBackButton=true] - 뒤로가기 버튼 노출 여부
 * @param {'arrow' | 'cancel'} [backIcon='arrow'] - 뒤로가기 아이콘 타입
 * @param {() => void} [onBack] - 뒤로가기 동작. 미제공 시 navigate(-1)
 *
 * @example
 * // 기본 사용
 * <TopBar title="마이페이지" />
 *
 * @example
 * // 커스텀 뒤로가기 (온보딩, 결제 플로우 등)
 * <TopBar
 *   title="온보딩"
 *   onBack={() => navigate('/step2', { replace: true })}
 * />
 *
 */
export default function TopBar({
  title,
  showBackButton = true,
  backIcon = 'arrow',
  onBack,
}: Props) {
  const navigate = useNavigate();

  const handleBack = onBack ?? (() => navigate(-1));

  return (
    <header className="relative h-[60px] select-none flex-center">
      {showBackButton && (
        <button
          onClick={handleBack}
          aria-label={backIcon === 'cancel' ? '닫기' : '뒤로가기'}
          type="button"
          className="absolute left-[30px] top-1/2"
        >
          <img
            src={
              backIcon === 'cancel'
                ? '/assets/icons/cancel.svg'
                : '/assets/icons/arrow-left.svg'
            }
            width={backIcon === 'cancel' ? 18 : 10}
            height={18}
            alt={backIcon === 'cancel' ? 'cancel' : 'back'}
            draggable="false"
          />
        </button>
      )}
      <span className="text-body-1 text-tx-default_3">{title}</span>
    </header>
  );
}
