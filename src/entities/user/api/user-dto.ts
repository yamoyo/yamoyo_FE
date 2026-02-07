import { MajorLabel } from '@/entities/profile/model/types/types';
import { CharacterImageId } from '@/shared/constants/char-images';

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
  mbti?: string;
  profileImageId: number;
}

export interface CurrentUser {
  userId: number;
  email: string;
  name: string;
  major: string;
  mbti?: string;
  profileImageId: CharacterImageId;
  createdAt: string;
}

export interface UpdateUserParams {
  name?: string;
  major?: string;
  mbti?: string;
  profileImageId?: number;
}
