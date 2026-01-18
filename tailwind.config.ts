import type { Config } from 'tailwindcss';

import {
  flexCenter,
  flexColCenter,
} from './src/shared/config/tailwind/plugins.ts';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
        'galmuri-14': ['Galmuri14', 'Spoqa Han Sans Neo', 'sans-serif'],
        'galmuri-11': [
          'Galmuri11',
          'Galmuri14',
          'Spoqa Han Sans Neo',
          'sans-serif',
        ],
      },
      fontSize: {
        'title-1': ['24px', { lineHeight: '24px', fontWeight: '700' }],
        'title-2': ['22px', { lineHeight: '24px', fontWeight: '700' }],
        'title-3': ['20px', { lineHeight: '24px', fontWeight: '700' }],
        'body-1': ['16px', { lineHeight: '18px', fontWeight: '700' }],
        'body-2': ['16px', { lineHeight: '18px', fontWeight: '600' }],
        'body-3': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-4': ['14px', { lineHeight: '18px', fontWeight: '700' }],
        'body-5': ['14px', { lineHeight: '18px', fontWeight: '600' }],
        'body-6': ['14px', { lineHeight: '18px', fontWeight: '500' }],
        'body-7': ['13px', { lineHeight: '18px', fontWeight: '600' }],
        'body-8': ['13px', { lineHeight: '18px', fontWeight: '700' }],
        'body-9': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
    },
  },
  plugins: [flexCenter, flexColCenter],
};

export default config;
