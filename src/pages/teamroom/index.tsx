import TopBar from '@/shared/ui/header/TopBar';
import MyTeams from '@/widgets/teamroom/ui/MyTeams';
import { useNavigate } from 'react-router-dom';

export default function MyTeamRoomPage() {
  const navigate = useNavigate();
  return (
    <>
      <TopBar title="MY 팀룸 목록" onBack={() => navigate('/home')} />
      <MyTeams />
    </>
  );
}
