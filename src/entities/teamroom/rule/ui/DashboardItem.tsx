import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  text?: string;
  order?: number;
  editMode?: boolean;
  showActionButton?: boolean;
  isAddButton?: boolean;
  className?: string;
  onClickAction?: () => void;
  onChangeText?: (next: string) => void;
}

export default function DashboardRuleItem({
  text = '',
  order,
  editMode = false,
  showActionButton = false,
  isAddButton = false,
  className,
  onClickAction,
  onChangeText,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  // editMode가 켜질 때 input에 포커스 + 커서 끝으로
  useEffect(() => {
    if (!editMode) return;
    // 값 동기화(부모 text가 바뀌었을 수도 있으니)
    setValue(text);

    inputRef.current?.focus();

    // 다음 렌더링 사이클에 실행
    // DOM이 업데이트되기 전/포커스가 안정되기 전에 커서 위치를 설정하면
    // 커서 위치가 제대로 설정되지 않을 수 있음
    requestAnimationFrame(() => {
      const len = inputRef.current?.value.length ?? 0;
      inputRef.current?.setSelectionRange(len, len); // 커서를 끝으로
    });
  }, [editMode, text]);

  if (isAddButton) {
    return (
      <button
        type="button"
        onClick={onClickAction}
        className={cn(
          'flex min-h-[60px] w-full items-center rounded-xl bg-bg-card pl-4 pr-2 text-left text-body-4.1 text-tx-default_4',
          className,
        )}
      >
        규칙 추가하기
        <img
          className="m-2 ml-auto h-6 w-6"
          src="/assets/icons/dashboard/plus.svg"
          alt="Plus Icon"
          draggable={false}
        />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'flex min-h-[60px] items-center justify-between rounded-xl bg-bg-card pl-4 pr-2 text-body-4.1 text-tx-default',
        className,
      )}
    >
      {editMode ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent outline-none"
          onBlur={() => onChangeText?.(value)}
        />
      ) : (
        <span className="w-full">
          {typeof order === 'number' ? `${order}. ` : ''}
          {text}
        </span>
      )}

      {showActionButton && (
        <button
          type="button"
          onClick={onClickAction}
          onMouseDown={(e) => e.preventDefault()}
        >
          {editMode ? (
            <img
              className="m-3 h-4 w-4"
              src="/assets/icons/cancel.svg"
              alt="Delete Icon"
              draggable={false}
            />
          ) : (
            <img
              className="m-2.5 h-5 w-5"
              src="/assets/icons/dashboard/edit.svg"
              alt="Edit Icon"
              draggable={false}
            />
          )}
        </button>
      )}
    </div>
  );
}
