import { MAJOR } from '../options/profile-items';
import { CHARACTER_IMAGE_ID } from '@/shared/constants/char-images';

export type MajorId = keyof typeof MAJOR;
export type MajorLabel = (typeof MAJOR)[MajorId]['label'];

interface Persona {
  profileImageId: (typeof CHARACTER_IMAGE_ID)[number];
  mbti: string;
}

export interface ProfileOnboardingForm {
  name: string;
  major: MajorId | null;
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
