import { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn } from '@/shared/config/tailwind/cn';

export type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string; // 하단에 표시
  isOk?: boolean;
  allowClear?: boolean; // X 버튼으로 값 지우기 허용 여부
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'>;

export default function TextField({
  value,
  onChange,
  errorMessage,
  allowClear = false,
  placeholder,
  ...rest
}: TextFieldProps) {
  const showError = Boolean(errorMessage);
  const showClear = allowClear && !!value;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={cn('flex w-full flex-col gap-2')}>
      <div className="relative">
        <input
          {...rest}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'h-12 w-full rounded-xl bg-bg-textfiled',
            'px-[15px] pr-10 text-body-4.1',
            'border border-bd-default',
            'text-tx-default',
            'placeholder:text-tx-textfiled_disabled',
            'outline-none transition',
            showError
              ? 'border-textfiled-line_error text-textfiled-line_error'
              : 'focus:border-textfiled-line_focus',
          )}
        />

        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[14px] top-1/2 flex -translate-y-1/2 transition-opacity hover:opacity-70"
          >
            <img
              src="/assets/icons/x-circle.svg"
              alt="입력 내용 지우기"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>

      {showError && (
        <p className="text-caption-1 text-textfiled-line_error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
