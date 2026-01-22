import { useTermsAgreement } from './useTermsAgreement';
import type { TermId } from './types';

export interface TermsAgreementWidgetProps {
  onSubmit?: (agreements: Record<TermId, boolean>) => void;
  isSubmitting?: boolean;
  onOpenDetail?: (id: TermId) => void;
}

/**
 * TermsAgreementWidget 전용 훅
 * - 약관 동의 상태 관리(useTermsAgreement)
 * - 버튼 disabled / submit 핸들러
 * - 약관 상세 열기 핸들러
 */
export const useTermsAgreementWidget = ({
  onSubmit,
  isSubmitting = false,
  onOpenDetail,
}: TermsAgreementWidgetProps) => {
  const { terms, agreements, allChecked, toggleAll, toggleOne } =
    useTermsAgreement();

  const isPrimaryDisabled = !allChecked || isSubmitting;

  const handleSubmit = () => {
    if (!onSubmit) return;
    if (!allChecked) return;
    if (isSubmitting) return;

    onSubmit(agreements);
  };

  const handleOpenDetail = (id: TermId) => {
    onOpenDetail?.(id);
  };

  return {
    // state
    terms,
    agreements,
    allChecked,
    isSubmitting,
    isPrimaryDisabled,

    // handlers
    handleSubmit,
    handleOpenDetail,
    toggleAll,
    toggleOne,
  };
};
