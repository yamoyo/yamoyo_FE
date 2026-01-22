import type { TermId, TermItem as TermItemType } from '../model/types';
import { TermItem } from './TermItem';
import CheckBox from './CheckBox';

type Props = {
  terms: TermItemType[];
  allChecked: boolean;
  agreements: Record<TermId, boolean>;
  onToggleAll: () => void;
  onToggleOne: (id: TermId) => void;
  onOpenDetail: (id: TermId) => void;
};

export default function TermsList({
  terms,
  allChecked,
  onToggleAll,
  agreements,
  onToggleOne,
  onOpenDetail,
}: Props) {
  return (
    <div className="mt-[26px]">
      {/* 전체 동의 */}
      <button
        type="button"
        onClick={onToggleAll}
        className="flex w-full items-center gap-2.5"
      >
        <CheckBox
          checked={allChecked}
          className={allChecked ? '' : 'border-[1.5px] border-tx-default_3'}
        />
        <span className="text-body-5 text-tx-default_2">전체 동의</span>
      </button>

      <div className="mb-[3px] mt-[13px] h-px w-full bg-[#3B415E]" />

      {/* 개별 약관 */}
      {terms.map((term) => (
        <TermItem
          key={term.id}
          term={term}
          checked={agreements[term.id]}
          onToggle={onToggleOne}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
