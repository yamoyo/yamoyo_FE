import { useEffect } from 'react';

const KAKAO_JAVASCRIPT_KEY: string = import.meta.env?.VITE_KAKAO_JAVASCRIPT_KEY;

export function KakaoSdkLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js';
    const id = 'kakao-js-sdk';

    const initKakao = () => {
      if (!window.Kakao) return;

      // 중복 init 방지
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
      }
    };

    // 이미 script가 있으면 로드 완료 여부에 따라 init
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      // 이미 로드 완료된 경우 window.Kakao가 있을 수 있음
      if (window.Kakao) initKakao();
      else existing.addEventListener('load', initKakao);
      return;
    }

    // script 주입
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.integrity =
      'sha384-JpLApTkB8lPskhVMhT+m5Ln8aHlnS0bsIexhaak0jOhAkMYedQoVghPfSpjNi9K1';

    script.onload = initKakao;
    script.onerror = () => {
      console.error('[Kakao] SDK load failed');
    };

    document.head.appendChild(script);
  }, []);

  return null;
}
