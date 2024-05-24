import React, { createContext, useEffect, useState, ReactNode, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

interface Notification {
  id: number;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userEventId: number;
}

export interface NotificationContextProps {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
  userId: string;
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ userId, children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(`https://localhost:7241/notification/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications(); // İlk yüklemede bildirimleri çek

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7241/notificationHub?userId=${userId}`, {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", async (message: string, userEventId: number) => {
      console.log(`Received notification for event ${userEventId}: ${message}`);
      alert(`Event ${userEventId}: ${message}`);
      await fetchNotifications();
    });

    connection.start()
      .then(() => console.log("SignalR connected"))
      .catch(err => console.error("Connection failed:", err));

    connection.onclose(async () => {
      console.log("SignalR disconnected");
      try {
        await connection.start();
        console.log("SignalR reconnected");
      } catch (err) {
        console.error("Reconnection failed:", err);
      }
    });

    return () => {
      connection.stop()
        .then(() => console.log("SignalR disconnected"))
        .catch(err => console.error("Disconnection failed:", err));
    };
  }, [userId, fetchNotifications]);

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
