import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 사용 안 하는 변수는 경고로 ( _ 로 시작하면 무시 )
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // any는 warn으로 처리
      '@typescript-eslint/no-explicit-any': 'warn',

      // console.log는 warn 처리
      // console.warn, console.error만 허용
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // JS 문자열은 single quote
      quotes: ['error', 'single', { avoidEscape: true }],

      // JSX attribute는 double quote
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
