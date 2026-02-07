import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface LocationSectionProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
}

export default function LocationSection<T extends FieldValues>({
  name,
  register,
  placeholder = '장소 혹은 플랫폼을 입력해주세요',
}: LocationSectionProps<T>) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        모임장소
      </label>
      <input
        {...register(name)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-bg-textfiled px-4 py-3 text-body-5 text-tx-default outline-none placeholder:text-tx-textfiled_disabled"
      />
    </div>
  );
}
