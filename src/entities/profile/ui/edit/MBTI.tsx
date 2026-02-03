import TopBar from '@/shared/ui/header/TopBar';
import TextField from '@/shared/ui/input/TextField';

import { useEditMBTI } from '../../model/hook/useEditProfile';
import EditProfileLayout from './Layout';

export default function EditMBTI() {
  const { MBTI, setMBTI, errorMessage, handleSaveMBTI } = useEditMBTI();

  return (
    <>
      <TopBar title="MBTI" />
      <EditProfileLayout
        disabled={!MBTI.trim()}
        showBackCharacter
        onClickBtn={handleSaveMBTI}
        isLoading={false} // TODO: 로딩 상태 관리
      >
        <TextField
          value={MBTI}
          onChange={setMBTI}
          placeholder="MBTI를 입력하세요"
          errorMessage={errorMessage}
        />
      </EditProfileLayout>
    </>
  );
}
