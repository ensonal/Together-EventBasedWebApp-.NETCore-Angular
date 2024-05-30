import React, { useEffect, useState } from "react";
import { getUserNotifications } from "../../api/services/NotificationService";
import { Typography } from "@mui/material";
import { NotificationsCard } from "./components/NotificationsCard";

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
      {notifications.map((notification : any) => (
        <NotificationsCard key={notification.notificationId} notification={notification} />
      ))}
    </div>
  );
}
