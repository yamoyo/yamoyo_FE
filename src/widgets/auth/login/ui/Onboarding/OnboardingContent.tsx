export function OnboardingContent({
  imgSrc,
  mainText,
  subText,
}: {
  imgSrc: string;
  mainText: string;
  subText: string;
}) {
  return (
    <div className="flex cursor-move select-none flex-col items-center">
      <img
        src={imgSrc}
        alt="onboarding"
        height={246}
        className="mb-[46px] h-[246px] w-auto object-contain"
      />
      <h1 className="text-h1 mb-2 text-[22px] font-bold leading-[36px] text-tx-default">
        {mainText}
      </h1>
      <p className="whitespace-pre-line text-center text-body-3 text-tx-default_3">
        {subText}
      </p>
    </div>
  );
}

export default OnboardingContent;
