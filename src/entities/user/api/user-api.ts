import { authClient } from '@/shared/api/auth/client';
import type { OnboardingProfileRequest } from '@/entities/user/api/user-dto';

export const userApi = {
  logout() {
    return authClient.delete('/auth/me');
  },

  onboardingTerm() {
    const body = {
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

    return authClient.post('/onboarding/terms', body);
  },

  onboardingProfile(body: OnboardingProfileRequest) {
    return authClient.post('/onboarding/profile', body);
  },
};
