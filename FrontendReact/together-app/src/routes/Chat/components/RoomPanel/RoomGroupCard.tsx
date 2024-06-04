import { Typography } from "@mui/material";
import "./RoomGroupCard.css";

export function RoomGroupCard() {
  return (
    <div className="room-group-card d-flex flex-row gap-2 justify-content-start align-items-center w-100 p-2 rounded-3">
      <div className="d-flex flex-row gap-2 align-items-center w-100">
        <img
          src="https://togetherwebapp.blob.core.windows.net/usereventimages/9c5983e7-8f9d-4762-8e04-a95de9406ea7"
          alt="group"
          className="rounded-3"
          height={50}
          width={50}
          style={{ objectFit: "cover" }}
        />
        <div className="d-flex flex-column">
          <Typography variant="body1" fontWeight="medium">
            Kaş Camping Meet
          </Typography>
          <Typography variant="body2">Last message is...</Typography>
        </div>
      </div>
    </div>
  );
}
