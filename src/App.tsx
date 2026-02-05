import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import TeamRoomWsLayout from '@/features/leader-game/ws/layout/TeamRoomWsLayout';
import LeaderGameStoreDebugPage from '@/pages/Debug';

import AuthGuard from './app/AuthGuard';
import GuestGuard from './app/GuestGuard';
import EditMajor from './entities/profile/ui/edit/Major';
import EditMBTI from './entities/profile/ui/edit/MBTI';
import EditName from './entities/profile/ui/edit/Name';
import ProfileOnboardingLayout from './entities/profile/ui/onboarding/Layout';
import MajorStep from './entities/profile/ui/onboarding/Major';
import NameStep from './entities/profile/ui/onboarding/Name';
import PersonaStep from './entities/profile/ui/onboarding/Persona';
import LoginPage from './pages';
import HomePage from './pages/home';
import Calendar from './pages/home/calendar';
import CreateSchedulePage from './pages/home/calendar/create-schedule';
import InvitePage from './pages/invite';
import CompletedTasks from './pages/mypage/completed-tasks';
import NotificationSettings from './pages/mypage/notification-settings';
import Profile from './pages/mypage/profile';
import NotificationPage from './pages/notification';
import TermsPage from './pages/onboarding/term';
import SplashPage from './pages/splash';
import MyTeamRoomPage from './pages/teamroom';
import TeamRoomMainPage from './pages/teamroom/[id]';
import TeamRoomEditPage from './pages/teamroom/[id]/edit';
import TeamRoomEditBannerPage from './pages/teamroom/[id]/edit/banner';
import TeamLeaderSelectPage from './pages/teamroom/[id]/leader-game';
import TeamRoomMembersPage from './pages/teamroom/[id]/members';
import TeamRoomMemberPage from './pages/teamroom/[id]/members/[memberId]';
import RuleSetupPage from './pages/teamroom/[id]/rule';
import ToolSetupPage from './pages/teamroom/[id]/tool';
import TeamRoomCreatePage from './pages/teamroom/create';
import BannerPage from './pages/teamroom/create/banner';
import TimeSelectPage from './pages/timeselect';
import EveryTimePage from './pages/timeselect/everytime';
import LikeTimePage from './pages/timeselect/liketime';
import ModalRoot from './shared/ui/modal/ModalRoot';
import Mypage from './widgets/mypage';

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
        <Route path="/debug" element={<LeaderGameStoreDebugPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/calendar">
          <Route index element={<Calendar />} />
          <Route path="create-schedule" element={<CreateSchedulePage />} />
        </Route>

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
        <Route path="/notification" element={<NotificationPage />} />

        {/* DEV: 개발용 라우트 (AuthGuard 우회) */}
        <Route path="/dev/timeselect/:id" element={<TimeSelectPage />} />
        <Route
          path="/dev/timeselect/:id/everytime"
          element={<EveryTimePage />}
        />

        {/* 게스트 전용 (로그인 안 된 사람만) */}
        <Route element={<GuestGuard />}>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
        </Route>

        {/* 로그인된 유저 전용 */}
        <Route element={<AuthGuard />}>
          <Route path="/home" element={<HomePage />} />

          <Route path="/calendar">
            <Route index element={<Calendar />} />
            <Route path="create-schedule" element={<CreateSchedulePage />} />
          </Route>

          <Route path="/teamroom">
            <Route index element={<MyTeamRoomPage />} />
            <Route path=":id" element={<TeamRoomMainPage />} />
            <Route path=":id/edit" element={<TeamRoomEditPage />} />
            <Route
              path=":id/edit/banner"
              element={<TeamRoomEditBannerPage />}
            />
            <Route path=":id/members" element={<TeamRoomMembersPage />} />
            <Route
              path=":id/members/:memberId"
              element={<TeamRoomMemberPage />}
            />
            <Route path="create" element={<TeamRoomCreatePage />} />
            <Route path="create/banner" element={<BannerPage />} />
            <Route path=":id/leader" element={<TeamLeaderSelectPage />} />
            <Route path=":id/rule" element={<RuleSetupPage />} />
            <Route path=":id/tool" element={<ToolSetupPage />} />
            <Route path=":id/timeselect" element={<TimeSelectPage />} />
            <Route
              path=":id/timeselect/everytime"
              element={<EveryTimePage />}
            />
            <Route path=":id/timeselect/liketime" element={<LikeTimePage />} />
          </Route>

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

          <Route path="/notification" element={<NotificationPage />} />

          <Route path="/onboarding/terms" element={<TermsPage />} />
          <Route
            path="/onboarding/profile"
            element={<ProfileOnboardingLayout />}
          >
            <Route path="name" element={<NameStep />} />
            <Route path="major" element={<MajorStep />} />
            <Route path="persona" element={<PersonaStep />} />
          </Route>

          <Route path="/invite" element={<InvitePage />} />

          <Route path="/teamroom">
            <Route index element={<MyTeamRoomPage />} />

            <Route path="create" element={<TeamRoomCreatePage />} />
            <Route path="create/banner" element={<BannerPage />} />

            {/* WS 필요한 라우트 */}
            <Route path=":id" element={<TeamRoomWsLayout />}>
              <Route index element={<TeamRoomMainPage />} />
              <Route path="leader-game" element={<TeamLeaderSelectPage />} />
            </Route>

            <Route path=":id/edit" element={<TeamRoomEditPage />} />
            <Route
              path=":id/edit/banner"
              element={<TeamRoomEditBannerPage />}
            />
            <Route path=":id/members" element={<TeamRoomMembersPage />} />
            <Route
              path=":id/members/:memberId"
              element={<TeamRoomMemberPage />}
            />

            <Route path=":id/rule" element={<RuleSetupPage />} />
            <Route path=":id/tool" element={<ToolSetupPage />} />
            <Route path=":id/timeselect" element={<TimeSelectPage />} />
            <Route
              path=":id/timeselect/everytime"
              element={<EveryTimePage />}
            />
            <Route path=":id/timeselect/liketime" element={<LikeTimePage />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}
