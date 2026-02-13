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
        'title-1': ['22px', { lineHeight: '36px', fontWeight: '700' }],
        'title-2': ['20px', { lineHeight: '32px', fontWeight: '700' }],
        'title-3': ['18px', { lineHeight: '28px', fontWeight: '700' }],
        'body-1': ['16px', { lineHeight: '24px', fontWeight: '700' }],
        'body-2': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-3': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-3.9': ['15px', { lineHeight: '20px', fontWeight: '700' }],
        'body-4': ['14px', { lineHeight: '21px', fontWeight: '700' }],
        'body-4.1': ['14px', { lineHeight: '21px', fontWeight: '500' }],
        'body-5': ['14px', { lineHeight: '21px', fontWeight: '400' }],
        'body-6': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'body-7': ['12px', { lineHeight: '18px', fontWeight: '700' }],
        'body-8': ['11px', { lineHeight: '16px', fontWeight: '700' }],
        'body-9': ['11px', { lineHeight: '16px', fontWeight: '400' }],
        'caption-1': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'caption-2': ['10px', { lineHeight: '12px', fontWeight: '400' }],
        'caption-2-2': ['10px', { lineHeight: '12px', fontWeight: '700' }],
      },
      colors: {
        /* === Background tokens === */
        'bg-default': '#202540',
        'bg-textfiled': '#2F3453',
        'bg-primary': '#804FFF',
        'bg-secondary': '#DDDC08',
        'bg-secondary_2': '#FDDA08',
        'bg-secondary_3': '#E4C717',
        'bg-bt-disabled': '#7D7C81',
        'bg-card': '#3D4366',

        /* === Text tokens === */
        'tx-default': '#FFFFFF',
        'tx-default_2': '#EEEFF8',
        'tx-default_3': '#D5D6E1',
        'tx-default_4': '#A3A8C4',
        'tx-default_5': '#767A90',
        'tx-default_black': '#171719',
        'tx-textfiled_disabled': '#666B8C',

        /* === Border / line tokens === */
        'bd-default': '#3E4463',
        'bd-textfiled_line': '#4C5377',
        'bd-card_line': '#6A7194',
        'textfiled-line_focus': '#AA89FF',
        'textfiled-line_error': '#EE5353',

        /* === Accent / chart tokens === */
        'ct-pink': '#EF4B8A',
        'ct-ch-1': '#00EEFF',
        'ct-ch-2': '#F776F7',
        'ct-ch-3': '#5867F3',
        'ct-ch-4': '#8F88DC',
        'ct-ch-5': '#F3546F',
        'ct-ch-6': '#F7EB55',
        'ct-ch-7': '#FBA000',
        'ct-ch-8': '#5DFBDB',
        'ct-ch-10': '#8255F7',

        /* etc */
        'bt-disabled': '#4C4A52',
      },
      screens: {
        blockMobileHover: {
          raw: '(hover: hover) and (pointer: fine)',
        },
      },
    },
  },
  plugins: [flexCenter, flexColCenter],
};

export default config;
