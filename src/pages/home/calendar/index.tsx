import CalendarWidget from '@/widgets/calendar/ui/CalendarWidget';
import MainHeader from '@/widgets/calendar/ui/MainHeader';

export default function Calendar() {
  return (
    <div className="flex h-screen flex-col">
      <MainHeader />
      <div className="flex-1 overflow-hidden">
        <CalendarWidget />
      </div>
    </div>
  );
}
