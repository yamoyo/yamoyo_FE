import { NOTIFICATION_ITEMS } from '../model/constant/notification-items';
import { useSettingNotification } from '../model/hook/useSettingNotification';

export default function NotificationToggle() {
  const { notifications, onClickToggle } = useSettingNotification();

  return (
    <div className="mx-auto mt-[29px] flex w-[349px] flex-col items-start gap-[50px]">
      {NOTIFICATION_ITEMS.map((item) => (
        <div key={item.id} className="flex justify-between self-stretch">
          <div className="flex flex-col items-start gap-1 leading-tight">
            <h3 className="text-[16px] font-medium text-white">{item.title}</h3>
            <p className="whitespace-nowrap text-[11px] text-gray-400">
              {item.description}
            </p>
          </div>

          <div className="flex h-full items-end">
            <button
              role="switch"
              aria-checked={notifications[item.id]}
              onClick={() => onClickToggle(item.id)}
              className={`relative flex h-[31px] w-[51px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out ${notifications[item.id] ? 'bg-bg-primary' : 'bg-[#78788029]'} `}
            >
              <span
                className={`h-[27px] w-[27px] rounded-full bg-white transition-transform duration-200 ease-in-out ${notifications[item.id] ? 'translate-x-[22px]' : 'translate-x-0.5'} `}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
