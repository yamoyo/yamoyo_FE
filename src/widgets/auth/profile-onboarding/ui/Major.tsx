import { MAJOR } from '../model/types';
import { cn } from '@/shared/config/tailwind/cn';
import { ProfileOnboardingContext } from '../model/types';
import { useOutletContext } from 'react-router-dom';

export default function MajorStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
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
        {MAJOR.map((item) => {
          const { Icon } = item;
          const isSelected = form.major === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => updateForm({ major: item.id })}
              aria-pressed={isSelected}
              className={cn(
                'h-[100px] flex-col gap-[15px] rounded-lg bg-bg-card transition flex-center',
                isSelected
                  ? 'bg-bg-secondary_2 text-tx-default_black'
                  : 'border border-bd-card_line text-tx-default_4 hover:border-textfiled-line_focus',
              )}
            >
              <Icon className="h-10 w-10" />
              <span className="text-body-8">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
