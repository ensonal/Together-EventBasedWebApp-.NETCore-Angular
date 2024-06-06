import { Card, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { splitDateToMonthName } from "../../../../../api/models/UserEvent";

export function EventDrawer({ eventDetails }: any) {
    const eventDate = new Date(eventDetails?.eventDate);
    const { month } = splitDateToMonthName(eventDate);
  return (
    <>
      <Card
        sx={{ boxShadow: 0, flex: 1.5 }}
        className="rounded-4 p-3"
        style={{ height: 200, overflow: "hidden" }}
      >
        <img
          src={eventDetails?.eventImageUrl}
          alt="Event"
          className="rounded-3 shadow-sm"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Card>
      <Typography variant="body1" fontWeight={"medium"} className="text-center">
        {eventDetails?.title}
      </Typography>
      <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-2">
        <FmdGoodIcon style={{ color: "#505050" }} fontSize="small" />
        <Typography variant="body2" style={{ color: "#505050", fontSize: 16 }}>
          {eventDetails?.city} /{" "}
          {eventDetails?.country}
        </Typography>
      </div>
      <div className="d-flex flex-row gap-2 align-items-center">
        <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
          <CalendarMonthRoundedIcon
            style={{ color: "#505050" }}
            fontSize="small"
          />
          <Typography
            variant="body2"
            style={{ color: "#505050", fontSize: 16 }}
          >
            {eventDate.getDay()} {month}
          </Typography>
        </div>
        <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
          <AccessTimeIcon style={{ color: "#505050" }} fontSize="small" />
          <Typography
            variant="body2"
            style={{ color: "#505050", fontSize: 16 }}
          >
            {eventDate.getHours()}:{eventDate.getMinutes()}
          </Typography>
        </div>
      </div>
    </>
  );
}
