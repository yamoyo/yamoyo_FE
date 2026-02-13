# `getPath` 동작 원리 정리

이 문서는 사다리 게임에서 사용되는 `getPath` 함수가 **어떤 원리로 경로를 계산하는지**를 예시와 함께 설명합니다.

---

## 함수 시그니처

```ts
type Step = { row: number; col: number };

function getPath(startIndex: number, ladder: number[][]): Step[];
```

- `startIndex`: 시작 열(column) 인덱스
- `ladder`: **행(row) 단위 데이터**
  - `ladder[rowIdx]`는 해당 행에서 **가로줄이 시작되는 열 인덱스 목록**입니다.
  - 가로줄은 항상 **`col -> col+1`**을 연결한다고 가정합니다.

---

## 핵심 규칙 (한 줄 요약)

각 행(row)을 내려갈 때마다 현재 열 `col`에 대해:

1. `row.includes(col)`이면, 현재 열에서 오른쪽으로 연결된 가로줄이 있으므로 `col += 1`
2. 아니면 `row.includes(col - 1)`이면, 왼쪽 열에서 현재 열로 연결된 가로줄이 있으므로 `col -= 1`
3. 둘 다 아니면 `col` 유지

그리고 각 행을 지난 뒤 `{ row: rowIdx, col }`을 경로에 기록합니다.

---

## 코드(참고)

```ts
const getPath = (startIndex: number, ladder: number[][]): Step[] => {
  let col = startIndex;
  const path: Step[] = [{ row: -1, col }];

  ladder.forEach((row, rowIdx) => {
    if (row.includes(col)) col += 1;
    else if (row.includes(col - 1)) col -= 1;
    path.push({ row: rowIdx, col });
  });

  return path;
};
```

---

## 예시 1: 4열(column) 사다리

열 인덱스: `0, 1, 2, 3`

가로줄 규칙: `x`가 있으면 `x`와 `x+1`을 연결합니다.

### 사다리 데이터

```ts
const ladder = [
  [1], // row 0: (1 <-> 2) 연결
  [], // row 1: 없음
  [0], // row 2: (0 <-> 1) 연결
  [2], // row 3: (2 <-> 3) 연결
];
```

시각화(개념)

- row 0: `1─2`
- row 2: `0─1`
- row 3: `2─3`

---

### 케이스 A) startIndex = 1

초기: `col = 1`

- row 0: `row.includes(1)` ✅ → `col = 2`
- row 1: `[]` → 유지 → `col = 2`
- row 2: `row.includes(2)` ❌, `row.includes(1)`? (`col-1=1`) ❌ → `col = 2`
- row 3: `row.includes(2)` ✅ → `col = 3`

반환되는 path:

```ts
[
  { row: -1, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 2 },
  { row: 2, col: 2 },
  { row: 3, col: 3 },
];
```

---

### 케이스 B) startIndex = 2

초기: `col = 2`

- row 0: `row.includes(2)` ❌, `row.includes(1)`? (`col-1=1`) ✅ → `col = 1`
  - 의미: row 0에 (1 <-> 2) 가로줄이 있으니, 2에서 내려오면 1로 넘어감
- row 1: 없음 → `col = 1`
- row 2: `row.includes(1)` ❌, `row.includes(0)`? (`col-1=0`) ✅ → `col = 0`
- row 3: `row.includes(0)` ❌, `row.includes(-1)` ❌ → `col = 0`

path:

```ts
[
  { row: -1, col: 2 },
  { row: 0, col: 1 },
  { row: 1, col: 1 },
  { row: 2, col: 0 },
  { row: 3, col: 0 },
];
```

---

## 예시 2: 왜 `col-1`을 검사하는지

`row.includes(col)`은 **현재 열에서 오른쪽으로 가는 가로줄**을 의미합니다.

하지만 현재 열이 가로줄의 **오른쪽 끝(col+1)** 인 경우도 있습니다.  
이때는 가로줄이 `col-1`에서 시작되었을 것이므로 `row.includes(col-1)`을 확인해야 합니다.

예를 들어 row에 `[1]`이 있고 현재 col이 2라면:

- `row.includes(2)`는 false
- 하지만 (1 <-> 2) 연결이 있으니 왼쪽(1)로 이동해야 함
- 그래서 `row.includes(2-1=1)`을 확인하고 true면 `col -= 1`

---

## 데이터 형태 주의사항

이 구현은 `ladder`가 **행(row) 기준**이라는 전제를 둡니다.

- `ladder[rowIdx] = [가로줄 시작 col들...]`

만약 백엔드/데이터가 **열(column) 기준**으로 내려온다면(예: `ladder[col] = [row들...]`),
`getPath`는 그대로 쓰면 잘못된 경로를 계산합니다.  
이 경우에는 데이터를 **row 기준으로 변환**하거나, 로직을 데이터 형태에 맞게 바꿔야 합니다.

---

## 테스트용 스니펫

```ts
const ladder = [[1], [], [0], [2]];

console.log(getPath(1, ladder));
console.log(getPath(2, ladder));
```

---

## 요약

- `getPath`는 row를 위에서 아래로 순회하면서 `col`이 바뀌는 규칙을 적용합니다.
- 규칙은 `row.includes(col)`(오른쪽 이동) → `row.includes(col-1)`(왼쪽 이동) 순으로 검사합니다.
- 반환값은 각 row를 지난 뒤의 `{row, col}` 기록이며, 애니메이션/이동 계산에 그대로 활용할 수 있습니다.
