import { useNavigate } from 'react-router';

import { NotificationType } from '@/entities/notification/api/notification-dto';
import { useNotifications } from '@/entities/notification/hooks/useNotification';
import { useReadNotification } from '@/entities/notification/hooks/useNotification';
import { useAllReadNotifications } from '@/entities/notification/hooks/useNotification';
import { cn } from '@/shared/config/tailwind/cn';
import NotificationItem from '@/widgets/notification/ui/NotificationItem';

export default function NotificationList() {
  const navigate = useNavigate();

  const { data: notifications, isLoading, isError } = useNotifications();
  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAllNotifications } = useAllReadNotifications();

  const allRead = notifications?.every((notification) => notification.isRead);
  // 모두읽음 버튼 비활성화 조건
  const allReadBtnDisabled =
    !notifications || allRead || notifications.length === 0;

  if (isLoading) {
    return <div>알림을 불러오는 중...</div>;
  }
  if (isError) {
    return <div>알림을 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!notifications) {
    return <div>알림이 없습니다.</div>;
  }

  // TOOL_SUGGESTION 알림은 협업툴 제안 페이지로 이동해야 하므로 disabled 상태를 isRead가 아닌 type으로 결정
  const disable = (isRead: boolean, type: NotificationType) =>
    type === 'TOOL_SUGGESTION' ? false : isRead;

  const handleReadNotification = (
    notificationId: number,
    teamRoomId: number,
    type: NotificationType,
    targetId: number,
  ) => {
    readNotification(notificationId);
    if (type === 'TOOL_SUGGESTION') {
      navigate(`/teamroom/${teamRoomId}/tool/proposal/${targetId}`);
    }
  };

  return (
    <div className="flex-grow">
      <div className="flex flex-col">
        <div className="flex w-full justify-end pb-3 pr-5 pt-1.5">
          <button
            className={cn('p-1 text-body-7 text-tx-default', {
              'opacity-50': allReadBtnDisabled,
            })}
            disabled={allReadBtnDisabled}
            onClick={() => readAllNotifications()}
          >
            모두읽음
          </button>
        </div>

        {/* 아래부터 알림 목록 */}
        {notifications.length === 0 ? (
          <p className="mt-[58px] flex justify-center text-body-3.9 text-tx-default_4">
            새 알림이 없습니다.
          </p>
        ) : (
          notifications.map((item) => (
            <NotificationItem
              key={item.notificationId}
              {...item}
              disabled={disable(item.isRead, item.type)}
              onClick={() =>
                handleReadNotification(
                  item.notificationId,
                  item.teamRoomId,
                  item.type,
                  item.targetId,
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
