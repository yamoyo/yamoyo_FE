import { cn } from '@/shared/config/tailwind/cn';
import BottomButton from '@/shared/ui/button/BottomButton';

interface TimeSelectControlsProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onReset: () => void;
  onImport: () => void;
}

export default function TimeSelectControls({
  isEditMode,
  onToggleEditMode,
  onReset,
  onImport,
}: TimeSelectControlsProps) {
  return (
    <div
      className="flex w-full select-none items-center justify-between"
      draggable="false"
    >
      <div className="flex items-center gap-1">
        <BottomButton
          text={isEditMode ? '설정 해제' : '시간 설정'}
          onClick={onToggleEditMode}
          className={cn(
            'h-[40px] w-[88px] rounded-lg text-body-4 transition-colors duration-200',
            isEditMode
              ? 'bg-tx-default_3 text-bg-default'
              : 'bg-bg-primary text-tx-default',
          )}
        />
        <button
          type="button"
          onClick={onReset}
          className="size-[40px] gap-[10px] rounded-[5.714px] bg-bd-textfiled_line flex-center"
        >
          <img
            src="/assets/icons/timeselect-reset.svg"
            alt="reset"
            width={28}
            height={28}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={onImport}
        className="h-[40px] w-[110px] gap-1 rounded-lg bg-bd-textfiled_line flex-center"
      >
        <img
          src="/assets/icons/everytime.svg"
          alt="에브리타임"
          className="size-5"
        />
        <span className="text-body-4 text-tx-default">불러오기</span>
      </button>
    </div>
  );
}
