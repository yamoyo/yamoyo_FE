import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTermsAgreement from './model/useTermsAgreement';
import TermsList from './ui/TermsList';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import { TermsOfService } from './ui/detail-term/TermsOfService';
import { PrivacyPolicy } from './ui/detail-term/PrivacyPolicy';

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

  const handleSubmit = () => {
    if (!allChecked) {
      alert('모든 약관에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);
    navigate('/onboarding/profile/name');

    setIsSubmitting(false);
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
