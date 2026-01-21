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
      colors: {
        /* === Background tokens === */
        'bg-default': '#202540',
        'bg-textfiled': '#2F3453',
        'bg-primary': '#804FFF',
        'bg-secondary': '#DDDC08',
        'bg-secondary_2': '#FDDA08',
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
        textfiled_line_focus: '#AA89FF',
        textfiled_line_error: '#EE5353',

        /* === Accent / chart tokens === */
        'ct-pink': '#EF4B8A',
        ct_ch_1: '#00EEFF',
        ct_ch_2: '#F776F7',
        ct_ch_3: '#5867F3',
        ct_ch_4: '#8F88DC',
        ct_ch_5: '#F3546F',
        ct_ch_6: '#F7EB55',
        ct_ch_7: '#FBA000',
        ct_ch_9: '#5DFBDB',
        ct_ch_10: '#8255F7',
      },
    },
  },
  plugins: [flexCenter, flexColCenter],
};

export default config;
