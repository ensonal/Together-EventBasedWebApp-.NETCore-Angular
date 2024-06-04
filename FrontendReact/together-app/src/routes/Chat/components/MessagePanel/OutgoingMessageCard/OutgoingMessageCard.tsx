import { Typography } from "@mui/material";
import "./OutgoingMessageCard.css";

export function OutgoingMessageCard() {
  return (
    <div className="d-flex flex-row justify-content-end align-items-start p-2 w-100">
      <div className="d-flex flex-column align-items-end">
        <div className="d-flex flex-row align-items-start">
          <div className="d-flex flex-column me-2 align-items-end text-end">
            <div className="d-flex flex-column justify-content-end gap-0 mt-1">
              <Typography variant="body1" fontWeight="medium">
                John Doe
              </Typography>
              <Typography variant="caption">
                10:30 AM
              </Typography>
            </div>
            <div className="rounded-3 p-2 mt-1 outgoing-message-background">
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra euismod odio, gravida pellentesque urna varius vitae.
              </Typography>
            </div>
          </div>
          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-3 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
