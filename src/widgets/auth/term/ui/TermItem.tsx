import type { TermId, TermItem as TermItemType } from '../model/types';
import CheckBox from './CheckBox';

type Props = {
  term: TermItemType;
  checked: boolean;
  onToggle: (id: TermId) => void;
  onOpenDetail: (id: TermId) => void;
};

export const TermItem = ({ term, checked, onToggle, onOpenDetail }: Props) => {
  const handleToggle = () => {
    onToggle(term.id);
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenDetail(term.id);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex w-full items-center justify-between py-2.5 text-left"
    >
      <div className="flex items-center gap-2.5">
        <CheckBox checked={checked} />
        <span className="text-body-5 text-tx-default_3">{term.label}</span>
      </div>

      <div
        className="p-2.5 flex-center"
        onClick={handleDetailClick}
        aria-label="약관 상세 보기"
      >
        <img
          src="/assets/icons/arrow-right.svg"
          alt="arrow right"
          width={6}
          height={11}
        />
      </div>
    </button>
  );
};
