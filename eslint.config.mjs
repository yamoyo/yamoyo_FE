import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    rules: {
      // 사용 안 하는 변수는 경고로 ( _ 로 시작하면 무시 )
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
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
  globalIgnores(['dist/**', 'node_modules/**']),
]);

export default eslintConfig;
