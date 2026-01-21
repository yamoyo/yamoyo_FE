import LoginButtons from './ui/LoginButtons';
import OnboardingCarousel from './ui/onboarding/OnboardingCarousel';

export function LoginWidget() {
  return (
    <div className="flex flex-1 flex-col justify-between px-6 pb-[42px] pt-[55px]">
      <OnboardingCarousel />
      <LoginButtons />
    </div>
  );
}

export default LoginWidget;
