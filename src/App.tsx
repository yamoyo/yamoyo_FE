import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from './app/AuthGuard';
import GuestGuard from './app/GuestGuard';

import SplashPage from './pages/splash';
import OAuthCallbackPage from './pages/oauth/callback';
import LoginPage from './pages';

import HomePage from './pages/home';
import OnboardPage from './pages/onboarding';
import TermsPage from './pages/onboarding/term';
import Mypage from './widgets/mypage/Mypage';
import Profile from './pages/mypage/profile';
import CompletedTasks from './pages/mypage/completed-tasks';
import NotificationSettings from './pages/mypage/notification-settings';
import RoulettePage from './pages/games/roulette';
import TimingGame from './pages/games/timing-game';
import NameStep from './entities/profile/ui/onboarding/Name';
import MajorStep from './entities/profile/ui/onboarding/Major';
import PersonaStep from './entities/profile/ui/onboarding/Persona';
import ProfileOnboardingLayout from './entities/profile/ui/onboarding/Layout';
import ModalRoot from './shared/ui/modal/ModalRoot';
import EditName from './entities/profile/ui/edit/Name';
import EditMajor from './entities/profile/ui/edit/Major';
import EditMBTI from './entities/profile/ui/edit/MBTI';

export default function App() {
  // 스플래시 표시 여부 상태
  // localStorage에 'hasVisited' 값이 없으면 첫 방문 -> 스플래시 표시
  // 이미 방문한 적 있으면 스플래시 건너뜀
  const [showSplash, setShowSplash] = useState(() => {
    return !localStorage.getItem('hasVisited');
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        localStorage.setItem('hasVisited', 'true'); // 방문 여부 상태 변경
        setShowSplash(false); // 스플래시를 숨긴다
      }, 4000); // 4초 후 스플래시를 종료
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [showSplash]);

  if (showSplash) {
    // 스플래시를 표시 중이면 스플래시 페이지만 렌더링
    return <SplashPage />;
  }

  return (
    // 스플래시 종료 후 메인 앱 렌더링
    <main className="mx-auto flex min-h-dvh max-w-[390px] flex-col bg-[#202540]">
      {/*
          모바일 전용 컨테이너
          - max-w-[430px]: 모바일 최대 폭 제한 ( 아이폰 Pro Max )
          - mx-auto: 데스크톱에서 가운데 정렬
          - min-h-dvh: 모바일 주소창 변화 대응 (vh 대신 dvh)
        */}

      <ModalRoot />

      <Routes>
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/mypage">
          <Route index element={<Mypage />} />
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="name" element={<EditName />} />
            <Route path="major" element={<EditMajor />} />
            <Route path="mbti" element={<EditMBTI />} />
          </Route>
          <Route path="completed-tasks" element={<CompletedTasks />} />
          <Route
            path="notification-settings"
            element={<NotificationSettings />}
          />
        </Route>

        <Route path="/onboarding" element={<OnboardPage />} />
        <Route path="/onboarding/terms" element={<TermsPage />} />
        <Route path="/games/roulette" element={<RoulettePage />} />
        <Route path="/games/timing-game" element={<TimingGame />} />

        <Route path="/onboarding/profile" element={<ProfileOnboardingLayout />}>
          <Route path="name" element={<NameStep />} />
          <Route path="major" element={<MajorStep />} />
          <Route path="persona" element={<PersonaStep />} />
        </Route>

        {/* 게스트 전용 (로그인 안 된 사람만) */}
        <Route element={<GuestGuard />}>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
        </Route>

        {/* 로그인된 유저 전용 */}
        <Route element={<AuthGuard />}></Route>
      </Routes>
    </main>
  );
}
