import { Typography } from "@mui/material";
import "./RoomGroupCard.css";

export function RoomGroupCard({ room, setRoomId }: any) {

  return (
    <div
      className="room-group-card d-flex flex-row gap-2 justify-content-start align-items-center w-100 p-2 rounded-3"
      style={{ cursor: "pointer" }}
      onClick={() => setRoomId(room.chatRoomId)}
    >
      <div className="d-flex flex-row gap-2 w-100">
        <img
          src={
            room?.userEventView?.eventImageUrl
              ? room?.userEventView?.eventImageUrl
              : "https://via.placeholder.com/50"
          }
          alt="group"
          className="rounded-3"
          height={50}
          width={50}
          style={{ objectFit: "cover" }}
        />
        <div className="d-flex flex-column">
          <Typography variant="body1" fontWeight="medium">
            {room?.roomTitle}
          </Typography>
        </div>
      </div>
    </div>
  );
}
