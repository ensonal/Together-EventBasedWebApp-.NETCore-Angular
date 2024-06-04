import { Typography } from "@mui/material";
import "./IncomingMessageCard.css";

export function IncomingMessageCard() {
  return (
    <div className="d-flex flex-row justify-content-start align-items-start p-2 w-100">
      <div className="d-flex flex-column align-items-start">
        <div className="d-flex flex-row align-items-start">
          <img
            src="https://randomuser.me/api/portraits/women/73.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-3 mt-1"
          />
          <div className="d-flex flex-column w-100 ms-2">
            <div className="d-flex flex-column gap-0 mt-1">
              <Typography variant="body1" fontWeight="medium">
                Anna Smith
              </Typography>
              <Typography variant="caption">
                02:39 PM
              </Typography>
            </div>
            <div className="rounded-3 p-2 mt-1 message-background">
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra euismod odio, gravida pellentesque urna varius vitae.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
