import {
  CurrentUser,
  OnboardingProfileRequest,
  OnboardingTermBody,
  UpdateUserParams,
} from '@/entities/user/api/user-dto';
import { authClient } from '@/shared/api/auth/client';

export const userApi = {
  getMe() {
    return authClient.get<CurrentUser>('/users/me');
  },

  updateMe(params: UpdateUserParams) {
    const query = new URLSearchParams();
    if (params.name) query.set('name', params.name);
    if (params.major) query.set('major', params.major);
    if (params.mbti) query.set('mbti', params.mbti);
    if (params.profileImageId)
      query.set('profileImageId', String(params.profileImageId));
    return authClient.put<CurrentUser>(`/users/me?${query.toString()}`);
  },

  logout() {
    return authClient.post('/auth/logout', undefined, {
      credentials: 'include',
    });
  },

  onboardingTerm() {
    return authClient.post('/onboarding/terms', OnboardingTermBody);
  },

  onboardingProfile(body: OnboardingProfileRequest) {
    return authClient.post('/onboarding/profile', body);
  },
};
