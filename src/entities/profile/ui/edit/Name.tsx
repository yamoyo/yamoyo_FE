import TopBar from '@/shared/ui/header/TopBar';
import TextField from '@/shared/ui/input/TextField';

import { useEditName } from '../../model/hook/useEditProfile';
import EditProfileLayout from './Layout';

export default function EditName() {
  const { name, setName, errorMessage, handleSaveName } = useEditName();

  return (
    <>
      <TopBar title="이름" />
      <EditProfileLayout
        disabled={!name.trim()}
        showBackCharacter
        onClickBtn={handleSaveName}
        isLoading={false} // TODO: 로딩 상태 관리
      >
        <TextField
          value={name}
          onChange={setName}
          placeholder="이름을 입력하세요"
          errorMessage={errorMessage}
        />
      </EditProfileLayout>
    </>
  );
}
