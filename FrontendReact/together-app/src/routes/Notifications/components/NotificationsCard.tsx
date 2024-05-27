import { Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { markNotificationAsRead } from "../../../api/services/NotificationService";

export function NotificationsCard({ notification }: { notification: any }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.notificationId);
    }
    navigate(`/event/${notification.userEventId}`);
  }

  return (
    <div className="d-flex gap-3">
      <Card
        sx={{
          boxShadow: 0,
          border: notification.isRead
            ? "1px solid #ddd"
            : "1px solid transparent",
          background: notification.isRead
            ? "white"
            : "linear-gradient(white, white) padding-box, linear-gradient(90deg, #3D52F3 0%, #3DCBF3 100%) border-box",
          cursor: "pointer",
        }}
        className="rounded-4 p-3 shadow-sm w-100"
        style={{ height: "auto" }}
      >
        <div className="d-flex flex-row w-100 align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <Typography variant="body1" sx={{ color: "#303030" }}>
              {notification.message}
            </Typography>
          </div>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleClick}
          >
            View
          </Button>
        </div>
      </Card>
    </div>
  );
}
