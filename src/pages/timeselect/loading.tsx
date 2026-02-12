import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TopBar from '@/shared/ui/header/TopBar';

export default function TimeSelectLoadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/teamroom/${id}`, { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [id, navigate]);

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
      <TopBar showBackButton={false} />
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
