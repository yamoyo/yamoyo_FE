interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  label?: string;
  placeholder?: string;
}

export default function DescriptionField({
  value,
  onChange,
  maxLength = 50,
  label = '한 줄 소개를 해주세요.',
  placeholder = '팀에 대해서 간단히 소개해주세요.',
}: DescriptionFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-body-4.1 text-tx-default_3">{label}</span>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="h-[90px] w-full resize-none rounded-xl border border-bd-default bg-bg-textfiled px-[15px] py-3 pr-16 text-body-4.1 text-tx-default outline-none transition placeholder:text-tx-textfiled_disabled focus:border-textfiled-line_focus"
        />
        <span className="absolute bottom-[16px] right-[16px] text-caption-1 text-tx-default_4">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
