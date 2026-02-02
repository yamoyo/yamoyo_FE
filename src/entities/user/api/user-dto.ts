import { MajorLabel } from '@/entities/profile/model/types/types';

export const OnboardingTermBody = {
  agreements: [
    {
      termsId: 1,
      agreed: true,
    },
    {
      termsId: 2,
      agreed: true,
    },
  ],
};

export interface OnboardingProfileRequest {
  name: string;
  major: MajorLabel;
  mbti: string;
  profileImageId: number;
}
