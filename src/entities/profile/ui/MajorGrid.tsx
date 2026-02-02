import { MAJOR } from '../model/options/profile-items';
import { MajorId } from '../model/types/types';
import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  major: MajorId | null;
  setMajor: (major: MajorId) => void;
}

/** 전공 선택 그리드 컴포넌트 */
export default function MajorGrid({ major, setMajor }: Props) {
  return (
    <>
      {/* 상단 타이틀 영역 */}
      <div className="mb-4 space-y-[5px]">
        <h1 className="text-title-2 text-tx-default_2">
          당신의 전공분야는 무엇인가요?
        </h1>
        <p className="text-caption-1 text-tx-default_4">
          팀의 시너지를 위한 전문분야를 등록해주세요
        </p>
      </div>

      {/* 전공 선택 그리드 */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(MAJOR).map(([id, item]) => {
          const { Icon, label } = item;
          const majorId = Number(id) as MajorId;
          const isSelected = major === majorId;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setMajor(majorId)}
              aria-pressed={isSelected}
              className={cn(
                'h-[100px] flex-col gap-[15px] rounded-lg bg-bg-card transition flex-center',
                isSelected
                  ? 'bg-bg-secondary_2 text-tx-default_black'
                  : 'border border-bd-card_line text-tx-default_4 hover:border-textfiled-line_focus',
              )}
            >
              <Icon className="h-10 w-10" />
              <span className="text-body-8">{label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
