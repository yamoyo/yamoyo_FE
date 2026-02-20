import LoginButtons from './ui/LoginButtons';
import OnboardingCarousel from './ui/onboarding/OnboardingCarousel';

export default function LoginWidget() {
  return (
    <div className="flex h-dvh flex-col px-6 pb-[clamp(20px,5vh,56px)]">
      <div className="flex flex-1 items-center">
        <OnboardingCarousel />
      </div>
      <div className="mt-[clamp(16px,4vh,92px)]">
        <LoginButtons />
      </div>
    </div>
  );
}
