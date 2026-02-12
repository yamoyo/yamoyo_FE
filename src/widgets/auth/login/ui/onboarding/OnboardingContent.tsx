export function OnboardingContent({
  imgSrc,
  mainText,
  subText,
  imgHeight = 'h-[246px]',
}: {
  imgSrc: string;
  mainText: string;
  subText: string;
  imgHeight?: string;
}) {
  return (
    <div className="flex cursor-move select-none flex-col items-center">
      <div className="mb-[46px] flex h-[304px] items-end justify-center">
        <img
          src={imgSrc}
          alt="onboarding"
          className={`${imgHeight} w-auto object-contain`}
          draggable={false}
        />
      </div>
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
