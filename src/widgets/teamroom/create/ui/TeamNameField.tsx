import TextField, { TextFieldProps } from '@/shared/ui/input/TextField';

interface TeamNameFieldProps extends TextFieldProps {
  label?: string;
  required?: boolean;
  maxLength?: number;
}

export default function TeamNameField({
  label = '팀 이름',
  required = true,
  maxLength = 20,
  value,
  placeholder = '예시 : 스위프 웹 12기',
  ...textFieldProps
}: TeamNameFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-body-4.1">
        <span className="text-tx-default_3">{label}</span>
        {required && <span className="text-bg-secondary_2">*</span>}
      </div>
      <div className="relative">
        <TextField
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          {...textFieldProps}
        />
        <span className="absolute bottom-[14px] right-[16px] text-caption-1 text-tx-default_4">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
