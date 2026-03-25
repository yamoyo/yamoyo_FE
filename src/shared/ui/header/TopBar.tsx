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
  /** 숨기기 */
  hidden?: boolean;
  /** 단계 */
  step?: {
    total: number;
    current: number;
  };
}

/**
 * 상단 바 컴포넌트
 *
 * @param {string} title - 표시할 페이지 제목
 * @param {boolean} [showBackButton=true] - 뒤로가기 버튼 노출 여부
 * @param {'arrow' | 'cancel'} [backIcon='arrow'] - 뒤로가기 아이콘 타입
 * @param {() => void} [onBack] - 뒤로가기 동작. 미제공 시 navigate(-1)
 * @param {ReactNode} [rightContent] - 오른쪽에 표시할 커스텀 콘텐츠
 * @param {boolean} [gameFont] - 게임 전용 폰트 적용 여부
 * @param {boolean} [hidden] - 헤더 숨김 여부
 * @param {{ total: number; current: number }} [step] - 단계 표시 옵션. total과 current를 포함하는 객체
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
  hidden,
  step,
}: Props) {
  const navigate = useNavigate();

  const handleBack = onBack ?? (() => navigate(-1));

  if (hidden) return null;

  return (
    <header className="flex min-h-[44px] select-none items-center justify-between gap-2 px-2 py-2">
      {showBackButton && (
        <button
          onClick={handleBack}
          aria-label={backIcon === 'cancel' ? '닫기' : '뒤로가기'}
          type="button"
          className="h-[44px] w-[44px] flex-center"
        >
          <img
            src={
              backIcon === 'cancel'
                ? '/assets/icons/cancel.svg'
                : '/assets/icons/arrow-left-pixel.svg'
            }
            width={backIcon === 'cancel' ? 18 : 16}
            height={backIcon === 'cancel' ? 18 : 16}
            alt={backIcon === 'cancel' ? 'cancel' : 'back'}
            draggable="false"
          />
        </button>
      )}
      {title && (
        <p
          className={cn('pt-[1px] text-center text-body-1 text-white', {
            'title-g3': gameFont,
          })}
          style={
            gameFont ? { filter: 'drop-shadow(2px 2px 0 #000)' } : undefined
          }
        >
          {title}
        </p>
      )}

      {step && (
        <div className="flex flex-1 justify-between gap-0.5">
          {Array.from({ length: step.total }, (_, index) => (
            <span
              key={index}
              className={cn(
                'h-1.5 flex-grow rounded-sm',
                index + 1 === step.current
                  ? 'bg-bd-textfiled-line_focus'
                  : 'bg-bg-textfiled',
              )}
            />
          ))}
        </div>
      )}

      <div className="h-[44px] min-w-[44px]">
        {rightContent && rightContent}
      </div>
    </header>
  );
}
