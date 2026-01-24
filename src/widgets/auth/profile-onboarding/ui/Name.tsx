import { useOutletContext } from 'react-router-dom';
import { ProfileOnboardingContext } from '../model/types';
import TextField from '@/shared/ui/input/TextField';

export default function NameStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
  // 한글 + 영어 + 숫자만 허용, 특수문자 불가, 공백 불가
  const errorMessage =
    !/^[0-9A-Za-z가-힣]+$/.test(form.name) && form.name.length > 0
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
