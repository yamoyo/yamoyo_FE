import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import StepProgressBar from '@/shared/ui/StepProgressBar';

export function ProfileOnboardingLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 단계에 따라 진행도 계산 (예시)
  const paths = [
    '/onboarding/profile/name',
    '/onboarding/profile/major',
    '/onboarding/profile/persona',
  ] as const;

  /** 현재 단계 인덱스 계산
   *
   * indexOf: 배열에서 특정 값의 인덱스를 찾는 메서드
   * (typeof paths)[number]: paths 배열의 요소 타입들 중 하나를 의미
   *
   * typeof paths → paths 값의 타입
   * [number] → 그 타입에 인덱싱해서 요소 타입들 중 하나를 가져옴
   *
   * 즉, 셋 중 하나라고 선언하는 것
   * 'a' | 'b' | 'c' 와 같은 효과
   *
   */
  const stepIndex = paths.indexOf(location.pathname as (typeof paths)[number]);
  const currentStep = stepIndex === -1 ? 0 : stepIndex;

  const handleBack = () => {
    navigate(paths[currentStep - 1] || '/', { replace: true });
  };

  return (
    <>
      <TopBar
        title="프로필 설정"
        onBack={handleBack}
        showBackButton={currentStep > 0}
      />

      {/* 진행 바가 있다면 여기 */}
      <StepProgressBar current={currentStep + 1} total={paths.length} />

      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
}
