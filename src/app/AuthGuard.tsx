import { useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FcmPayload } from '@/entities/notification/model/fcm-payload';
import { useNotificationStore } from '@/entities/notification/model/notification-store';
import { onAuthBlocked, resetAuthBlocked } from '@/shared/api/auth/event-bus';
import { useAuthStore } from '@/shared/api/auth/store';
import { useAuthBootstrap } from '@/shared/api/auth/use-auth-bootstrap';
import { listenForegroundMessages } from '@/shared/lib/firebase/on-message';
import { requestNotificationPermission } from '@/shared/lib/firebase/push-permission';
import { useToastStore } from '@/shared/ui/toast/toast-store';

export default function AuthGuard() {
  useAuthBootstrap(false);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const authReady = useAuthStore((s) => s.authReady);
  const accessToken = useAuthStore((s) => s.accessToken);
  const pushToast = useToastStore((s) => s.push);
  const addRestNotificationCount = useNotificationStore(
    (s) => s.addRestNotificationCount,
  );

  const navigateToolProposal = useCallback(
    (
      type: string,
      teamRoomId: string | number,
      proposalId?: string | number,
    ) => {
      if (type !== 'TOOL_SUGGESTION' || !proposalId) return;

      navigate(`/teamroom/${teamRoomId}/tool/proposal/${proposalId}`);
    },
    [navigate],
  );

  const handlePayload = useCallback(
    async (payload: FcmPayload) => {
      addRestNotificationCount();

      // 협업툴 제안이 승인되면 협업툴 조회 refetch
      if (payload.data.type === 'TOOL_APPROVED') {
        await qc.refetchQueries({
          queryKey: ['teamTool', Number(payload.data.teamRoomId), 'confirmed'],
          type: 'all',
        });
      }

      pushToast({
        id: payload.messageId,
        message:
          payload.notification?.body.replace(/\. /g, '.\n') ||
          '새 알림이 도착했습니다.',
        onClick: () =>
          navigateToolProposal(
            payload.data.type,
            payload.data.teamRoomId,
            payload.data.targetId,
          ),
      });
    },
    [pushToast, navigateToolProposal, qc, addRestNotificationCount],
  );

  useEffect(() => {
    // 페이지 접속 시 토큰 발급 과정이 완료되지 않으면 return
    if (!authReady) return;

    const unsubscribe = onAuthBlocked('AUTH_EXPIRED', () => {
      useAuthStore.getState().clear();

      // 플래그 초기화
      resetAuthBlocked(['AUTH_EXPIRED']);

      if (location.pathname !== '/invite') {
        navigate('/', { replace: true });
      }
    });

    return unsubscribe;
  }, [authReady, navigate, location]);

  useEffect(() => {
    if (!accessToken) return;

    const onboardingStatus = jwtDecode<{
      onboardingStatus: 'TERMS_PENDING' | 'PROFILE_PENDING' | undefined;
    }>(accessToken).onboardingStatus;

    const isOnboardingPage = location.pathname.startsWith('/onboarding');

    if (
      onboardingStatus !== 'TERMS_PENDING' &&
      onboardingStatus !== 'PROFILE_PENDING' &&
      isOnboardingPage
    ) {
      navigate('/home', { replace: true });
    }
  }, [accessToken, navigate, location.pathname]);

  // TERMS_PENDING / PROFILE_PENDING 이벤트를 한 곳에서 구독, 발생 시 각 온보딩 화면으로 이동
  useEffect(() => {
    const saveRedirectUrl = () => {
      // 온보딩 완료 후 현재 페이지로 돌아올 수 있도록 URL 저장
      // 이미 저장된 값이 있으면 덮어쓰지 않음 (초대 링크 등 보존)
      // 단, 온보딩 관련 페이지는 저장하지 않음
      if (
        !sessionStorage.getItem('redirectAfterLogin') &&
        !location.pathname.startsWith('/onboarding')
      ) {
        sessionStorage.setItem(
          'redirectAfterLogin',
          location.pathname + location.search,
        );
      }
    };

    const offTerms = onAuthBlocked('TERMS_PENDING', () => {
      saveRedirectUrl();
      navigate('/onboarding/terms', { replace: true });
    });

    const offProfile = onAuthBlocked('PROFILE_PENDING', () => {
      saveRedirectUrl();
      navigate('/onboarding/profile/name', { replace: true });
    });

    return () => {
      offTerms();
      offProfile();
    };
  }, [navigate, location]);

  useEffect(() => {
    if (!accessToken) return;
    // 알림 권한 요청 (로그인 시 한 번만)
    requestNotificationPermission();

    // 백그라운드 메시지 수신 처리
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.kind !== 'FCM_BACKGROUND_MESSAGE') return;
        handlePayload(event.data.payload);
      });
    }

    // 포그라운드 메시지 수신 처리
    const unsubscribe = listenForegroundMessages((payload: FcmPayload) =>
      handlePayload(payload),
    );

    return () => unsubscribe();
  }, [handlePayload, accessToken]);

  if (!authReady && location.pathname !== '/invite') {
    return <div>로딩중...</div>;
  }

  return <Outlet />; // 하위 Route 렌더
}
