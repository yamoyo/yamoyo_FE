import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error', // Hook 규칙 위반 (if 안에서 호출 등)
      'react-hooks/exhaustive-deps': 'warn', // 의존성 배열 검사 (우리가 원하던 그 경고)

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
