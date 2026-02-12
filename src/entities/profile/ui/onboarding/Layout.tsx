import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { validateProfileItem } from '@/entities/profile/model/hook/useEditProfile';
import { MAJOR } from '@/entities/profile/model/options/profile-items';
import { onboardingProfile } from '@/entities/user/api/user-api';
import { CHARACTER_IMAGE_ID } from '@/shared/constants/char-images';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import StepProgressBar from '@/shared/ui/StepProgressBar';

import { ProfileOnboardingForm } from '../../model/types/types';

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

  const disableCondition: boolean = (() => {
    const { name, major, persona } = form;

    switch (location.pathname) {
      case paths[0]:
        // 빈 값이거나(name required), 이름 형식 에러가 있으면 disable
        return (
          name.trim().length === 0 || Boolean(validateProfileItem('name', name))
        );

      case paths[1]:
        return major === null;

      case paths[2]:
        return (
          persona.profileImageId === null ||
          Boolean(validateProfileItem('MBTI', persona.mbti || ''))
        );

      default:
        return false;
    }
  })();

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
    const persona = {
      profileImageId: form.persona.profileImageId,
      mbti: !!form.persona.mbti ? form.persona.mbti : undefined,
    };

    setIsLoading(true);
    try {
      await onboardingProfile({
        name: form.name,
        major,
        ...persona,
      });
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl, { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
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

      <StepProgressBar current={currentStep + 1} total={paths.length} />

      <img
        src="/assets/onboarding/purple-earth.png"
        alt="background decoration"
        className="pointer-events-none absolute bottom-[-114px] left-1/2 h-[536px] max-w-none -translate-x-1/2 select-none"
      />

      <div className="z-10 flex flex-grow flex-col justify-between px-6 pb-[60px] pt-[35px]">
        <div>
          <img
            src="/assets/onboarding/onboarding-icon.svg"
            alt=""
            className="mb-4 select-none"
            draggable={false}
          />
          <Outlet
            context={{
              form,
              updateForm,
              currentStep,
            }}
          />
        </div>
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
