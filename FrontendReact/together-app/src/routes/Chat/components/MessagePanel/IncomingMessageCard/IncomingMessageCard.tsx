import { Typography } from "@mui/material";
import "./IncomingMessageCard.css";
import { ChatModel } from "../../../../../api/models/ChatModels/ChatModel";

export function IncomingMessageCard({ message }: { message: ChatModel }) {
  return (
    <div className="d-flex flex-row justify-content-start align-items-start p-2 w-100">
      <div className="d-flex flex-column align-items-start w-100">
        <div className="d-flex flex-row align-items-start w-100">
          <img
            src={
              message.messageUserView.profileImageUrl
                ? message.messageUserView.profileImageUrl
                : "https://via.placeholder.com/40"
            }
            alt="User"
            width={40}
            height={40}
            className="rounded-3 mt-1"
            style={{ objectFit: "cover" }}
          />
          <div className="d-flex flex-column ms-2">
            <div className="d-flex flex-column  gap-0 mt-1">
              <Typography variant="body1" fontWeight="medium">
                {message.messageUserView.name} {message.messageUserView.surname}
              </Typography>
              <Typography variant="caption">{message.sentDate}</Typography>
            </div>
            <div className="rounded-3 p-2 mt-1 message-background">
              <Typography variant="body1">{message.content}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

