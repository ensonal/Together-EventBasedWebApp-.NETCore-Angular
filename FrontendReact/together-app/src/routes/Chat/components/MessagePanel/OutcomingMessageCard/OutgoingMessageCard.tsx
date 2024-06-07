import { Typography } from "@mui/material";
import "./OutgoingMessageCard.css";
import { ChatModel } from "../../../../../api/models/ChatModels/ChatModel";

export function OutgoingMessageCard({ message }: { message: ChatModel }) {
  return (
    <div className="d-flex flex-row justify-content-end align-items-start p-2 w-100">
      <div className="d-flex flex-column align-items-end w-100">
        <Typography variant="caption" className="text-muted">
          {message.sentDate}
        </Typography>
        <div className="rounded-3 p-2 mt-1 outgoing-message-background">
          <Typography variant="body1">{message.content}</Typography>
        </div>
      </div>
    </div>
  );
}
