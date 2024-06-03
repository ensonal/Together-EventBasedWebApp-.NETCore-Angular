import { Card, Typography } from "@mui/material";
import { UserEvent } from "../../../api/models/UserEvent";
import { useNavigate } from "react-router-dom";

export function UserEventCardView({ userEvent }: { userEvent: UserEvent }) {
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate(`/event/${userEvent.userEventId}`);
  };

  return (
    <Card
      className="rounded-4 p-3 shadow"
      style={{
        height: "auto",
        overflow: "hidden",
        flex: "1 1 calc(25% - 1rem)", 
        maxWidth: "calc(25% - 1rem)",   
        cursor: "pointer",
        border: "1px solid #e0e0e0",
      }}
      sx={{ boxShadow: 0 }}
      onClick={handleEventClick}
    >
      <div className="d-flex flex-column gap-1">
        <img
          src={
            userEvent.eventImageUrl
              ? userEvent.eventImageUrl
              : "https://eagleexaminer.com/wp-content/uploads/2018/04/boston-marathon-900x600.jpg"
          }
          alt="Event"
          className="rounded-3 shadow"
          width={"100%"}
          height={95}
          style={{ objectFit: "cover" }}
        />
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          className="text-center m-0 p-0"
          noWrap
        >
          {userEvent.title}
        </Typography>
        <div className="d-flex flex-row justify-content-center m-0 p-0">
          <Typography variant="body2" style={{ color: "#929292" }} noWrap>
            {userEvent.city} / {userEvent.country}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
