/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface Window {
  Kakao?: {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Share: {
      sendScrap: (options: { requestUrl: string; templateId?: number }) => void;
    };
  };
}
