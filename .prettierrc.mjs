/** @type {import("prettier").Config} */
const config = {
  // 따옴표 스타일 설정
  singleQuote: true, // JS/TS 코드에서는 기본적으로 '...' 사용
  jsxSingleQuote: false, // JSX에서는 "..." 사용 (기본값)

  // 세미콜론(;) 사용 여부
  // true  → 문장 끝에 ; 붙임
  semi: true,

  // 객체 리터럴에서 중괄호 사이 공백
  // true  → { foo: 'bar' }
  bracketSpacing: true,
};

export default config;
