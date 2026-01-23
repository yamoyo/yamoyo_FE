import { useMemo, useState } from 'react';
import type { TermId, TermItem } from './types';

const TERMS: TermItem[] = [
  {
    id: 'service',
    label: '서비스 이용 약관 (필수)',
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용 동의 (필수)',
  },
  {
    id: 'age',
    label: '만 14세 이상 확인 (필수)',
  },
];

export default function useTermsAgreement() {
  const [agreements, setAgreements] = useState<Record<TermId, boolean>>({
    service: false,
    privacy: false,
    age: false,
  });

  const allChecked = useMemo(
    () => TERMS.every((term) => agreements[term.id]),
    [agreements],
  );

  const toggleAll = () => {
    const next = !allChecked;
    setAgreements({
      service: next,
      privacy: next,
      age: next,
    });
  };

  const toggleOne = (id: TermId) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return {
    terms: TERMS,
    agreements,
    allChecked,
    toggleAll,
    toggleOne,
  };
}
