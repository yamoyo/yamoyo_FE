import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// __dirname 대체 (ESM 환경)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['font/*.woff2', 'assets/**/*'],
      manifest: {
        name: 'Yamoyo', // 설치 배너에 표시되는 이름
        short_name: 'Yamoyo', // 앱 아이콘 아래에 표시되는 이름
        description: '모이자마자 완성되는 팀 세팅 플랫폼', // 프로젝트 설명
        theme_color: '#ffffff',
        background_color: '#f5f5f5',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        // icons는 나중에 추가
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'], // 빌드 시 캐싱할 파일 패턴
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10, // 캐싱할 항목에 대한 최대 갯수
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1년간 캐싱 유지
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
