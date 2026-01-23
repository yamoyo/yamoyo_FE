import { useOutletContext } from 'react-router-dom';
import { ProfileOnboardingContext } from '../model/types';
import TextField from '@/shared/ui/input/TextField';

export default function NameStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
  const errorMessage = /[!@#$%^&*(),.?":{}|<>]/.test(form.name)
    ? '특수문자는 입력불가입니다.'
    : '';

  return (
    <div className="space-y-4">
      <h1 className="text-title-2 text-tx-default_2">이름을 알려주세요</h1>
      <TextField
        value={form.name}
        onChange={(value) => updateForm({ name: value })}
        placeholder="아모요"
        allowClear
        errorMessage={errorMessage}
      />
    </div>
  );
}
