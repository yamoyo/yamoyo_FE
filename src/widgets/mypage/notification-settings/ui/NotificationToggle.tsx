import { useState } from 'react';

const NOTIFICATION_ITEMS = [
  {
    id: 'service',
    title: '서비스 알림',
    description: '팀장 선정 결과, 팀 규칙 변경 등 필수 정보를 알려드려요.',
  },
  {
    id: 'sms',
    title: '문자(SMS) 알림',
    description: '앱을 확인하지 않을 때도 중요한 소식을 문자로 보내드려요.',
  },
] as const;

export default function NotificationToggle() {
  const [notifications, setNotifications] = useState(
    NOTIFICATION_ITEMS.reduce(
      (acc, item) => ({
        // reduce를 사용해 각 알림 항목의 id를 key로, 초기값 true를 value로 설정
        ...acc,
        [item.id]: true,
      }),
      {} as Record<string, boolean>,
    ),
  );

  const handleToggle = (id: string) => {
    // ex) service 알림이 true면 false로, false면 true로 변경
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
              onClick={() => handleToggle(item.id)}
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
