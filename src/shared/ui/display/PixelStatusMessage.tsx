import { cn } from '@/shared/config/tailwind/cn';

export default function PixelStatusMessage({
  message,
  fullScreen = false,
  className,
}: {
  message: string;
  fullScreen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'select-none space-y-4 flex-col-center',
        className,
        fullScreen && 'flex-1 px-6 pb-[10vh]',
      )}
    >
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
