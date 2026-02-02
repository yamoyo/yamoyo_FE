import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import StepProgressBar from '@/shared/ui/StepProgressBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import { useState } from 'react';
import { ProfileOnboardingForm } from '../../model/types/types';
import { CHARACTER_IMAGE_ID } from '@/shared/constants/char-images';
import { userApi } from '@/entities/user/api/user-api';
import { MAJOR } from '@/entities/profile/model/options/profile-items';

const paths = [
  '/onboarding/profile/name',
  '/onboarding/profile/major',
  '/onboarding/profile/persona',
] as const;

const randomProfileImageId =
  CHARACTER_IMAGE_ID[Math.floor(Math.random() * CHARACTER_IMAGE_ID.length)];

export default function ProfileOnboardingLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ProfileOnboardingForm>({
    name: '',
    major: null,
    persona: { profileImageId: randomProfileImageId, mbti: '' },
  });

  const disableCondition =
    (form.name.trim().length === 0 && location.pathname === paths[0]) ||
    (form.major === null && location.pathname === paths[1]) ||
    (form.persona.profileImageId === null && location.pathname === paths[2]);

  const updateForm = (patch: Partial<ProfileOnboardingForm>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  // 현재 단계에 따라 진행도 계산 (예시)

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

  const isLastStep = currentStep === paths.length - 1;

  const handleNext = async () => {
    if (!isLastStep) {
      navigate(paths[currentStep + 1]);
      return;
    }

    if (!form.major) {
      alert('전공을 선택해 주세요.');
      return;
    }
    const major = MAJOR[form.major].label;

    setIsLoading(true);
    try {
      await userApi.onboardingProfile({
        name: form.name,
        major,
        ...form.persona,
      });
      navigate('/home', { replace: true });
    } catch (_) {
      alert('프로필 설정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <TopBar
        title="프로필 설정"
        onBack={handleBack}
        showBackButton={currentStep > 0}
      />

      {/* 진행 바가 있다면 여기 */}
      <StepProgressBar current={currentStep + 1} total={paths.length} />

      <img
        src="/assets/onboarding/purple-earth.png"
        alt="background decoration"
        className="pointer-events-none absolute bottom-[-114px] left-1/2 h-[536px] max-w-none -translate-x-1/2 select-none"
      />

      <div className="z-10 flex flex-grow flex-col justify-between px-6 pb-[60px] pt-[46px]">
        <Outlet
          context={{
            form,
            updateForm,
            currentStep,
          }}
        />
        <BottomButton
          text={isLastStep ? '설정완료' : '다음'}
          onClick={handleNext}
          disabled={disableCondition || isLoading}
          isLoading={isLoading}
          loadingText="처리중..."
        />
      </div>
    </div>
  );
}
