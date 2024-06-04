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
            width={32}
            height={32}
            className="rounded-3 mt-1"
          />
          <div className="d-flex flex-column w-100 ms-2">
            <div className="d-flex flex-row gap-1">
              <Typography variant="body1" fontWeight="medium">
                John Doe
              </Typography>
              <Typography variant="caption" className="mt-1">
                10:30 AM
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
