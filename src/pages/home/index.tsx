import HomeHeader from '@/widgets/home/homeHeader';
import HomeCard from '@/widgets/home/homeCard';
import HomeList from '@/widgets/home/homeList';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <HomeHeader />
      <HomeCard />
      <HomeList />
    </main>
  );
};

export default HomePage;
