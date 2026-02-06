import { cn } from '@/shared/config/tailwind/cn';

export default function PixelStatusMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={cn('select-none space-y-4 flex-col-center', className)}>
      <img
        src="/assets/gif/onboarding.gif"
        alt="animation"
        className="w-[192px]"
        draggable={false}
      />
      <span className="whitespace-pre-line text-center text-body-1 text-tx-default">
        {message}
      </span>
    </div>
  );
}
