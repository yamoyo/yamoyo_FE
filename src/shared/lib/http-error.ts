/**
 *
 * 🛠️ fetch API 호출 시 발생하는 에러를 나타내는 클래스
 *
 * - axios의 AxiosError와 유사한 역할을 수행
 * - axios에서 알아서 처리해주던 에러 핸들링을 fetch에서는 직접 구현해야 함
 *
 * - 백엔드 실패 응답 참고
 * https://github.com/yamoyo/yamoyo_BE/blob/dev/docs/api-response-guide.md#실패-응답-예시
 *
 * - 상속 관련 문서
 * https://www.notion.so/Error-2ec08cf035808081975aed7b5ebb5ecd
 *
 */
export class YamoyoError<T = unknown> extends Error {
  // 내장 Error 클래스에서 상속받은 프로퍼티 외에 백엔드 실패 응답 추가
  code: number;
  data?: T;

  /**
   * constructor란
   * - 클래스에서 객체가 생성될 때 자동으로 한 번 호출되는 함수
   *
   * - `new Something(...)` 형태로 실행됨
   * - 예를 들어 아래처럼 message, code 등 파라미터를 받아서 객체 초기화에 사용
   *
   * ```
   * const err = new YamoyoError({
   *    message: '사용자를 찾을 수 없습니다.',
   *    code: 404,
   *    data: { id: 1 },
   * });
   *
   * ```
   * @param params
   * - message: 에러 메시지
   * - code: 에러 코드 (백엔드에서 전달하는 HTTP 상태 코드 등)
   * - data: 추가적인 에러 데이터
   *
   * */
  constructor(params: { message: string; code: number; data?: T }) {
    // 부모 클래스인 Error의 생성자를 호출하여 message 초기화
    super(params.message);

    // 커스텀 에러 이름, 코드, 데이터 초기화
    this.name = 'Yamoyo Error';
    this.code = params.code;
    this.data = params.data;
  }
}
