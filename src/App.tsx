import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RoulettePage from './pages/games/roulette';
import TimingGame from './pages/games/timing-game';
import OAuthCallbackPage from './pages/oauth/callback';
import TypographyPage from './pages/typography';
import AuthGuard from './app/AuthGuard';

export default function App() {
  return (
    <div className="mx-auto min-h-dvh max-w-[430px] bg-white">
      {/*
          모바일 전용 컨테이너
          - max-w-[430px]: 모바일 최대 폭 제한 ( 아이폰 Pro Max )
          - mx-auto: 데스크톱에서 가운데 정렬
          - min-h-dvh: 모바일 주소창 변화 대응 (vh 대신 dvh)
        */}
      <AuthGuard>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
          <Route path="/games/roulette" element={<RoulettePage />} />
          <Route path="/games/timing-game" element={<TimingGame />} />
          <Route path="/typography" element={<TypographyPage />} />
        </Routes>
      </AuthGuard>
    </div>
  );
}
