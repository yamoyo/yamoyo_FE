import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  text: string;
  icon: React.ReactNode;
  onClickIcon: () => void;
  editMode?: boolean;
  isHiddenIcon?: boolean;
  className?: string;

  onChangeText?: (next: string) => void;
}

export default function RuleItem({
  text,
  icon,
  onClickIcon,
  editMode = false,
  isHiddenIcon = false,
  className,
  onChangeText,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(text);

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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);

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
          onChange={handleChange}
          className="w-full bg-transparent outline-none"
          onBlur={() => onChangeText?.(value)}
        />
      ) : (
        <span className="w-full">{text}</span>
      )}

      {!isHiddenIcon && (
        <button
          type="button"
          onClick={onClickIcon}
          onMouseDown={(e) => e.preventDefault()}
        >
          {icon}
        </button>
      )}
    </div>
  );
}
