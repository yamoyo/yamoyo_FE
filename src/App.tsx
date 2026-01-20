import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RoulettePage from './pages/games/roulette';
import TimingGame from './pages/games/timing-game';
import OAuthCallbackPage from './pages/oauth/callback';
import TypographyPage from './pages/typography';
import SplashPage from './pages/splash';

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
      }, 3000); // 3초 후 스플래시를 종료
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [showSplash]);

  if (showSplash) {
    // 스플래시를 표시 중이면 스플래시 페이지만 렌더링
    return <SplashPage />;
  }

  return (
    // 스플래시 종료 후 메인 앱 렌더링
    <div className="mx-auto min-h-dvh max-w-[430px] bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
        <Route path="/games/roulette" element={<RoulettePage />} />
        <Route path="/games/timing-game" element={<TimingGame />} />
        <Route path="/typography" element={<TypographyPage />} />
      </Routes>
    </div>
  );
}
