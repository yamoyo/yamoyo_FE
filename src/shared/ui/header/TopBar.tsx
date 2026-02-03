import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  title?: string;
  /** 기본값: true — 뒤로가기 버튼 노출 여부 */
  showBackButton?: boolean;
  /** 기본값: 'arrow' — 뒤로가기 아이콘 타입 */
  backIcon?: 'arrow' | 'cancel';
  /** 커스텀 뒤로가기 로직. 없으면 navigate(-1) */
  onBack?: () => void;
  /** 오른쪽 아이콘들이 있는 헤더를 위한 옵션 */
  rightContent?: ReactNode;
  /** 게임 폰트를 적용할 때 사용 */
  gameFont?: boolean;
}

/**
 * 상단 바 컴포넌트
 *
 * @param {string} title - 표시할 페이지 제목
 * @param {boolean} [showBackButton=true] - 뒤로가기 버튼 노출 여부
 * @param {'arrow' | 'cancel'} [backIcon='arrow'] - 뒤로가기 아이콘 타입
 * @param {() => void} [onBack] - 뒤로가기 동작. 미제공 시 navigate(-1)
 * @param {boolean} [gameFont] - 게임 전용 폰트 적용 여부
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
  rightContent,
  gameFont,
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
          className="absolute left-[30px] top-1/2 h-10 w-10 -translate-y-1/2 flex-center"
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
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-body-1 text-white',
          { 'title-g3': gameFont },
        )}
        style={gameFont ? { filter: 'drop-shadow(2px 2px 0 #000)' } : undefined}
      >
        {title}
      </span>

      {rightContent && (
        <div className="absolute right-[22px] top-1/2 -translate-y-1/2">
          {rightContent}
        </div>
      )}
    </header>
  );
}
