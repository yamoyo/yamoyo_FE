import {
  OnboardingProfileRequest,
  OnboardingTermBody,
} from '@/entities/user/api/user-dto';
import { authClient } from '@/shared/api/auth/client';

export const userApi = {
  logout() {
    return authClient.delete('/auth/me');
  },

  onboardingTerm() {
    return authClient.post('/onboarding/terms', OnboardingTermBody);
  },

  onboardingProfile(body: OnboardingProfileRequest) {
    return authClient.post('/onboarding/profile', body);
  },
};
