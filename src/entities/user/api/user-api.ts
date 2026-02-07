import {
  CurrentUser,
  OnboardingProfileRequest,
  OnboardingTermBody,
  UpdateUserParams,
} from '@/entities/user/api/user-dto';
import { authClient } from '@/shared/api/auth/client';

export function getMe() {
  return authClient.get<CurrentUser>('/users/me');
}

export function updateMe(params: UpdateUserParams) {
  const query = new URLSearchParams();
  if (params.name) query.set('name', params.name);
  if (params.major) query.set('major', params.major);
  if (params.mbti) query.set('mbti', params.mbti);
  if (params.profileImageId)
    query.set('profileImageId', String(params.profileImageId));

  return authClient.put<CurrentUser>(`/users/me?${query.toString()}`);
}

export function logout() {
  return authClient.post('/auth/logout', undefined, {
    credentials: 'include',
  });
}

export function deleteMe() {
  return authClient.delete('/auth/me', {
    credentials: 'include',
  });
}

export function onboardingTerm() {
  return authClient.post('/onboarding/terms', OnboardingTermBody);
}

export function onboardingProfile(body: OnboardingProfileRequest) {
  return authClient.post('/onboarding/profile', body);
}
