/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface Window {
  Kakao?: {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Share: {
      sendDefault: (options: {
        objectType: string;

        content: {
          title: string;
          description: string;
          imageUrl: string;
          link: {
            webUrl: string;
          };
        };
        itemContent?: {
          profileText: string;
          profileImageUrl: string;
        };
        buttonTitle: string;
      }) => void;
    };
  };
}
