import TopBar from '@/shared/ui/header/TopBar';
import TextField from '@/shared/ui/input/TextField';

import { useEditMBTI } from '../../model/hook/useEditProfile';
import EditProfileLayout from './Layout';

export default function EditMBTI() {
  const { MBTI, setMBTI, errorMessage, handleSaveMBTI, isLoading } =
    useEditMBTI();

  return (
    <>
      <TopBar title="MBTI" />
      <EditProfileLayout
        disabled={!MBTI.trim() || !!errorMessage}
        showBackCharacter
        onClickBtn={handleSaveMBTI}
        isLoading={isLoading}
      >
        <TextField
          value={MBTI}
          onChange={setMBTI}
          placeholder="MBTI를 입력하세요"
          errorMessage={errorMessage}
          toUppercase
        />
      </EditProfileLayout>
    </>
  );
}
