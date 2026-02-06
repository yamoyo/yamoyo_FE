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
    <>
      <HomeHeader />
      <HomeCard />
      <HomeList />
    </>
  );
}

export default HomePage;
