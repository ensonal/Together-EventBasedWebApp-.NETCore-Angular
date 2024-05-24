import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const NotificationContext = React.createContext<any[]>([]);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7241/notificationhub?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        connection.on("ReceiveNotification", (notification) => {
           alert("New notification: " + notification);
          setNotifications((prev) => [notification, ...prev]);
        });
      })
      .catch((error) => console.error("Connection failed: ", error));

    return () => {
      connection.stop();
    };
  }, [userId]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}
