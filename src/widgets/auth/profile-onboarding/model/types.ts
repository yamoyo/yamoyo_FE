import Major1Icon from '@/shared/assets/icons/major/major-1.svg?react';
import Major2Icon from '@/shared/assets/icons/major/major-2.svg?react';
import Major3Icon from '@/shared/assets/icons/major/major-3.svg?react';
import Major4Icon from '@/shared/assets/icons/major/major-4.svg?react';
import Major5Icon from '@/shared/assets/icons/major/major-5.svg?react';
import Major6Icon from '@/shared/assets/icons/major/major-6.svg?react';
import Major7Icon from '@/shared/assets/icons/major/major-7.svg?react';
import Major8Icon from '@/shared/assets/icons/major/major-8.svg?react';
import Major9Icon from '@/shared/assets/icons/major/major-9.svg?react';
import { CHARACTER_IMAGE_ID } from '@/shared/constants/char-images';

export const MAJOR = [
  { id: 1, label: '컴퓨터/IT', Icon: Major1Icon },
  { id: 2, label: '디자인', Icon: Major2Icon },
  { id: 3, label: '미디어/콘텐츠', Icon: Major3Icon },
  { id: 4, label: '경영/경제', Icon: Major4Icon },
  { id: 5, label: '인문/교육', Icon: Major5Icon },
  { id: 6, label: '자연과학', Icon: Major6Icon },
  { id: 7, label: '교육/심리', Icon: Major7Icon },
  { id: 8, label: '의료/보건', Icon: Major8Icon },
  { id: 9, label: '기타/비전공', Icon: Major9Icon },
] as const;

type majorType = (typeof MAJOR)[number]['id'];

interface Persona {
  characterId: (typeof CHARACTER_IMAGE_ID)[number];
  mbti: string;
}

export interface ProfileOnboardingForm {
  name: string;
  major: majorType | null;
  persona: Persona;
}

export interface ProfileOnboardingContext {
  form: ProfileOnboardingForm;

  /** Partial<T>: T의 모든 속성을 선택적(optional)으로 만듬
   *
   * - 매번 새 필드를 전부 넣지 않고, 일부 속성만 업데이트할 때 유용
   * - 예: `updateForm({ name: '민혁' });`
   *
   */
  updateForm: (patch: Partial<ProfileOnboardingForm>) => void;
  currentStep: number;
}
