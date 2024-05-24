import React, { useContext, useEffect } from 'react';
import { NotificationContext, NotificationContextProps } from '../../providers/NotificationProvider';

const NotificationPage: React.FC = () => {
  const notificationContext = useContext<NotificationContextProps | undefined>(NotificationContext);

  useEffect(() => {
    if (notificationContext) {
      notificationContext.fetchNotifications();
    }
  }, [notificationContext]);

  if (!notificationContext) {
    return null; 
  }

  const { notifications, fetchNotifications } = notificationContext;

  const markAsRead = async (notificationId: number) => {
    await fetch(`https://localhost:7241/api/notifications/mark-as-read/${notificationId}`, { method: 'POST' });
    fetchNotifications();
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} style={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
            Event {notification.userEventId}: {notification.message}
            {!notification.isRead && (
              <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
