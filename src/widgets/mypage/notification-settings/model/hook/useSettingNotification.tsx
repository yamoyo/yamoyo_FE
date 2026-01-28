import { useState } from 'react';
import { NOTIFICATION_ITEMS } from '../constant/notification-items';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

export const useSettingNotification = () => {
  const openModal = useModalStore((s) => s.openChoiceModal);
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

  const onClickToggle = (id: string) => {
    if (id === 'sms') {
      handleToggle(id);
      return;
    }
    if (id === 'service') {
      if (notifications[id]) {
        openModal({
          title: '서비스 알림 수신 거부',
          description:
            '서비스 알림을 해제하시겠습니까?\n해제 시 팀의 주요 의사결정 및 규칙 변경 사항에 대한 알림을 받을 수 없습니다.',
          leftLabel: '취소',
          rightLabel: '확인',
          rightBtnClassName: 'bg-bg-primary',
          onClickRightBtn: () => {
            handleToggle(id);
            return;
          },
        });
      } else {
        handleToggle(id);
      }

      return;
    }
  };

  const handleToggle = (id: string) => {
    // ex) service 알림이 true면 false로, false면 true로 변경
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return {
    notifications,
    onClickToggle,
  };
};
