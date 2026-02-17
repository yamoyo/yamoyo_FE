import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeCard from '@/widgets/home/HomeCard';
import HomeHeader from '@/widgets/home/HomeHeader';
import HomeList from '@/widgets/home/HomeList';

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    if (redirectUrl) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectUrl, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative flex flex-1 flex-col">
      <img
        src="/assets/home/home-bg.png"
        alt=""
        className="pointer-events-none absolute right-0 top-[200px] z-0 h-[321px] w-[230px] select-none"
        draggable="false"
      />
      <HomeHeader />
      <HomeCard />
      <HomeList />
    </div>
  );
}

export default HomePage;
