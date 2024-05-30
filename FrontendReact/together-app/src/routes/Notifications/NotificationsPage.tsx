import React, { useEffect, useState } from "react";
import { getUserNotifications } from "../../api/services/NotificationService";
import { Typography } from "@mui/material";
import { NotificationsCard } from "./components/NotificationsCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const response = await getUserNotifications();
      setNotifications(response);
    }
    fetchNotifications();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 w-100">
      <Typography variant="h6" sx={{ color: "#303030" }}>
        Notifications
      </Typography>
      {notifications.length === 0 ||
      !notifications ||
      notifications === undefined ? (
        <EmptyState type="notifications" />
      ) : (
        notifications.map((notification: any) => (
          <NotificationsCard
            key={notification.notificationId}
            notification={notification}
          />
        ))
      )}
    </div>
  );
}
