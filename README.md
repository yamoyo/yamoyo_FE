<div align="center">
  <h1>⚛️ YAMOYO Frontend</h1>
  <h3>✨ 팀 프로젝트 시작에 필요한 결정을 재밌고 빠르게 끝내는 팀 초기 세팅 서비스 ✨</h3>

  <p>
    <a href="https://yamoyo.kr">🌐 서비스 바로가기</a>
    &nbsp;|&nbsp;
    <a href="https://github.com/yamoyo#-프로젝트-소개">📘 프로젝트 소개</a>
  </p>
  
  <img width="70%" alt="main" src="https://github.com/user-attachments/assets/b6dab28b-5355-4ccb-a264-0688ad9df953" />

<br/><br/><br/>

  <table>
  <thead>
    <tr>
      <th>분류</th>
      <th>기술 스택</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Language</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>Framework</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black"
        />
        <img
          src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>Build</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>State Management</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/Zustand-433E38?style=flat&logo=zustand&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=react-query&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>API & WebSocket</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/Fetch-000000?style=flat&logo=javascript&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/WebSocket-010101?style=flat&logo=socketdotio&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/STOMP%20%2B%20SockJS-444444?style=flat&logo=websocket&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>Form & Animation</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>Styling & Utils</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/clsx-1E1E1E?style=flat&logo=react&logoColor=white"
        />
      </td>
    </tr>
    <tr>
      <td><b>Notification</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black"
        />
      </td>
    </tr>
    <tr>
      <td><b>Code Quality</b></td>
      <td>
        <img
          src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black"
        />
        <img
          src="https://img.shields.io/badge/Husky-000000?style=flat&logo=git&logoColor=white"
        />
        <img
          src="https://img.shields.io/badge/lint--staged-5E5E5E?style=flat&logo=github&logoColor=white"
        />
      </td>
    </tr>
  </tbody>
</table>
</div>

<br/>

## 🏗️ Architecture

YAMOYO Frontend는 **Feature-Sliced Design(FSD)** 아키텍처를 기반으로 구성되어 있습니다.

FSD는 기능 중심으로 코드를 구성하여 **확장성과 유지보수성을 높이기 위한 아키텍처 패턴**입니다.

### Layer 규칙

레이어는 **위에서 아래 방향으로만 import가 가능합니다.**

app → pages → widgets → features → entities → shared

- 상위 레이어는 하위 레이어를 import 할 수 있습니다.
- **같은 레이어를 import 할 수 없습니다.**
- **하위 레이어에서 상위 레이어를 import 할 수 없습니다.**

이를 통해 **의존성 방향을 명확하게 유지**하고, 구조가 복잡해지는 것을 방지합니다.

---

### Layer 역할

**features**

- 사용자의 **행위(Action)** 또는 기능 단위를 담당합니다.
- 예: 생성(Create), 수정(Update), 삭제(Delete) 등 사용자 동작

**entities**

- **데이터 모델과 표시(UI)** 를 담당합니다.
- 데이터 조회(Read)와 관련된 로직이 위치합니다.

**widgets**

- 여러 UI 조각을 조합하여 만든 **독립적인 화면 블록**입니다.
- 예: 카드 목록, 대시보드 섹션 등

**shared**

- 특정 도메인에 종속되지 않는 **공통 코드**를 관리합니다.
- UI 컴포넌트, 유틸 함수, 라이브러리 설정 등이 포함됩니다.

---

### shared와 entities 구분 기준

- **entities**
  - 특정 도메인에 명확하게 속하는 코드
  - 예: user, team, tool 등

- **shared**
  - 여러 도메인에서 공통으로 사용하는 코드
  - 예: Button, Modal, Calendar, util 함수 등

---

<br/>

## 🌿 Branch Strategy

브랜치는 다음 규칙을 따릅니다.

### 신기능 개발

형식

```
feat/기능명
```

예시

```
feat/team-invite
feat/leader-game
```

### 버그 수정

형식

```
fix/이슈번호
```

예시

```
fix/123
```

---

## 🖇️ Commit Convention

커밋 메시지는 다음 형식을 따릅니다.

```
type: message
```

### Commit Type

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 수정
- `style` : 코드 formatting, 세미콜론 누락 등 **동작 변화 없는 수정**
- `refactor` : 코드 리팩토링
- `test` : 테스트 코드 추가 또는 수정
- `chore` : 패키지 매니저 수정, 기타 설정 변경 (예: `.gitignore`)
- `design` : CSS/컴포넌트 등 **사용자 UI 디자인 변경**
- `comment` : 필요한 주석 추가 또는 변경
- `rename` : 파일 또는 폴더 이름 변경
- `remove` : 파일 삭제

---

## 📁 Naming Convention

프로젝트 전반에서 다음 네이밍 규칙을 사용합니다.

### 폴더

- 기본 **소문자**
- 두 단어 이상은 **kebab-case** 사용

예시

```
games/timing-game
myprofile/completed-tasks
```

---

### React 컴포넌트

- **PascalCase**
- `export default function` 방식 사용

예시

```ts
export default function HomeCard() {
  return <div />;
}
```

파일명

```
HomeCard.tsx
BottomSheet.tsx
```

---

### Custom Hook

- `use` prefix + **camelCase**

예시

```
useTimingGame.ts
useTeamRoom.ts
```

---

### 일반 TypeScript 파일

(API / util / store 등)

- **kebab-case** 사용

예시

```
refresh-token.ts
auth-event-bus.ts
leader-game-store.ts
```

---

### 함수 이름

- **camelCase** 사용

예시

```ts
refreshAccessToken();
createTeamRoom();
joinTeamRoom();
```

파일명과 함수명은 다음과 같이 구분합니다.

```
refresh-access-token.ts → refreshAccessToken()
```
