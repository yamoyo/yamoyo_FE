import TopBar from '@/shared/ui/header/TopBar';
import EditProfileLayout from './Layout';
import { useEditMajor } from '../../model/hook/useEditProfile';
import MajorGrid from '../MajorGrid';

export default function EditMajor() {
  const { major, setMajor, handleSaveMajor } = useEditMajor();

  return (
    <>
      <TopBar title="전공" />
      <EditProfileLayout
        disabled={!major}
        onClickBtn={handleSaveMajor}
        isLoading={false} // TODO: 로딩 상태 관리
      >
        <MajorGrid major={major} setMajor={setMajor} />
      </EditProfileLayout>
    </>
  );
}
