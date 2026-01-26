import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  titleClassName?: string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  titleClassName,
}: BottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 300,
            }}
            className="relative w-full max-w-[390px] rounded-t-[20px] bg-[#292E46]"
          >
            <div className="flex justify-center pb-2 pt-1">
              <div className="h-1 w-12" />
            </div>

            {title && (
              <div
                className={`relative flex select-none items-center justify-end px-6 py-4 ${titleClassName ?? ''}`}
              >
                <h2
                  className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-tx-default"
                  draggable="false"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="flex-center"
                  aria-lable="모달 닫기"
                >
                  <img
                    src="/assets/icons/cancel.svg"
                    width={15}
                    height={15}
                    alt=""
                    draggable="false"
                  />
                </button>
              </div>
            )}

            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
