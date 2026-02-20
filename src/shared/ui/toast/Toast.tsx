import { useToastStore } from '@/shared/ui/toast/toast-store';

export function Toast() {
  const { toasts, beginRemove } = useToastStore();

  return (
    <div
      className="pointer-events-none fixed z-[9999] flex h-screen w-[390px] flex-col justify-end gap-2 px-6 pb-[56px]"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => beginRemove(t.id)}
          className={`pointer-events-auto min-h-12 w-full cursor-pointer whitespace-pre-line rounded-xl bg-[#191C2D] p-3 text-left text-body-7 text-tx-default transition ${t.isLeaving ? 'toast-leave' : 'toast-enter'} `}
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}
