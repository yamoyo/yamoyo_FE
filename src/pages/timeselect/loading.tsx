import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTimeSelect } from '@/entities/timeselect/hooks/useTimeSelect';
import TopBar from '@/shared/ui/header/TopBar';

export default function TimeSelectLoadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const teamRoomId = Number(id);
  const { data, refetch } = useTimeSelect(teamRoomId);

  useEffect(() => {
    if (!teamRoomId || data?.status === 'FINALIZED') return;
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [teamRoomId, refetch, data?.status]);

  useEffect(() => {
    if (!data) return;
    if (data.status === 'FINALIZED') {
      navigate(`/teamroom/${id}`, { replace: true });
    }
  }, [data, id, navigate, queryClient, teamRoomId]);

  return (
    <div
      className="flex h-dvh flex-col"
      style={{
        backgroundImage: 'url(/assets/timeselect/timeselect-bg.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <TopBar onBack={() => navigate(-1)} />
      <div className="flex-1 px-6 text-center flex-center">
        <div className="flex w-[221px] flex-col items-center gap-4">
          <img
            src="/assets/gif/loading.gif"
            alt="로딩"
            className="h-[141px] w-[192px]"
          />
          <p className="text-title-3 text-tx-default opacity-[0.68]">
            야모요가 모두의 시간을 모아,
            <br />
            최적의 회의 시간을 찾고 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
