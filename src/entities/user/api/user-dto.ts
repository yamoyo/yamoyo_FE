import { MajorLabel } from '@/entities/profile/model/types/types';

export interface OnboardingProfileRequest {
  name: string;
  major: MajorLabel;
  mbti: string;
  profileImageId: number;
}
