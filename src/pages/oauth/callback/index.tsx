import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '@/shared/api/refresh-token';

export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  /** 로그인 시 초기 accessToken 발급 */
  const requestInitialAccessToken = refreshAccessToken;

  useEffect(() => {
    (async () => {
      try {
        const ok = await requestInitialAccessToken();

        if (!ok) {
          setError('로그인 세션이 유효하지 않습니다.');
          return;
        }

        navigate('/');
      } catch (e) {
        console.error(e);
        setError('로그인 처리 중 오류가 발생했습니다.');
      }
    })(); // 뒤 괄호 ()로 즉시 실행 -> IIFE(Immediately Invoked Function Expression)라고 부름

    // 위 코드를 풀어 쓰면
    // const run = async () => {
    //   ...
    // };
    // run();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>로그인 처리 중입니다...</div>;
}
