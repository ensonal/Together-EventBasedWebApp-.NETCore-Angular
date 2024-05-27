import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

interface State extends SnackbarOrigin {
  open: boolean;
}

export const NotificationContext = React.createContext<any[]>([]);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [notifications, setNotifications] = useState<any[]>([]);
  const [notification, setNotification] = useState<string>("");
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
          handleClick({ vertical: "bottom", horizontal: "center" })();
          setNotification(notification);
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={notification}
        key={vertical + horizontal}
        autoHideDuration={7000}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
}
