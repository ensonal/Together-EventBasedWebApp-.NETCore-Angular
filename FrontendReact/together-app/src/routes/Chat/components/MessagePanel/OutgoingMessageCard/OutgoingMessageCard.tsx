import { Typography } from "@mui/material";
import "./OutgoingMessageCard.css";

export function OutgoingMessageCard() {
  return (
    <div className="d-flex flex-row justify-content-end align-items-start p-2 w-100">
      <div className="d-flex flex-column align-items-end">
        <div className="d-flex flex-row align-items-start">
          <div className="d-flex flex-column me-2 align-items-end text-end">
            <div className="rounded-3 p-2 mt-1 outgoing-message-background">
              <Typography variant="body1" className="text-start">
                Lorem ipsum dolor sit conse trsews adipiscing elit.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
