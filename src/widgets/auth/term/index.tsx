import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { onboardingTerm } from '@/entities/user/api/user-api';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import useTermsAgreement from '@/widgets/auth/term/model/useTermsAgreement';
import { PrivacyPolicy } from '@/widgets/auth/term/ui/detail-term/PrivacyPolicy';
import { TermsOfService } from '@/widgets/auth/term/ui/detail-term/TermsOfService';
import TermsList from '@/widgets/auth/term/ui/TermsList';

export function TermsAgreementPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    terms,
    agreements,
    allChecked,
    toggleAll,
    toggleOne,
    openedDetailTerm,
    setOpenedDetailTerm,
  } = useTermsAgreement();

  const handleSubmit = async () => {
    if (!allChecked) {
      alert('모든 약관에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onboardingTerm();
      navigate('/onboarding/profile/name');
    } catch (_) {
      alert(
        '약관 동의 과정 중 일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (openedDetailTerm === 'service') {
    return (
      <>
        <TopBar onBack={() => setOpenedDetailTerm(null)} />
        <TermsOfService />
      </>
    );
  }

  if (openedDetailTerm === 'privacy') {
    return (
      <>
        <TopBar onBack={() => setOpenedDetailTerm(null)} />
        <PrivacyPolicy />
      </>
    );
  }

  return (
    <>
      <TopBar title="회원 가입" />
      <div className="mt-10 flex flex-1 flex-col justify-between px-6 pb-[60px]">
        <div>
          <p className="text-body-2 text-tx-default_2">약관 동의하기</p>

          <TermsList
            terms={terms}
            allChecked={allChecked}
            onToggleAll={toggleAll}
            agreements={agreements}
            onToggleOne={toggleOne}
            onOpenDetail={setOpenedDetailTerm}
          />
        </div>
        <BottomButton
          disabled={!allChecked || isSubmitting}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="처리중..."
          text="가입하기"
        />
      </div>
    </>
  );
}
