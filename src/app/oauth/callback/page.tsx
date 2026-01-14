'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestInitialAccessToken } from '@/shared/api/auth-request';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const ok = await requestInitialAccessToken();

        if (!ok) {
          setError('로그인 세션이 유효하지 않습니다.');
          return;
        }

        router.replace('/');
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
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>로그인 처리 중입니다...</div>;
}
