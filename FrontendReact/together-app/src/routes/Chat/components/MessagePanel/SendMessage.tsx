import { Divider, IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { SendMessageToGroup } from "../../../../api/services/ChatService";
import { useState } from "react";

export function SendMessage({ roomId }: any) {
  const [content, setContent] = useState("");

  const sendMessage = async () => {
    if (content.trim() === "") return;
    await SendMessageToGroup(roomId, content);
    setContent("");
  };

  return (
    <div className="d-flex flex-column justify-content-start gap-1">
      <Divider />
      <div className="d-flex flex-row justify-content-between align-items-center gap-3 p-2 ps-3 pe-3 w-100">
        <input
          type="text"
          placeholder="Write a message"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <IconButton onClick={sendMessage}>
          <SendRoundedIcon style={{ cursor: "pointer" }} htmlColor="#707070" />
        </IconButton>
      </div>
    </div>
  );
}
