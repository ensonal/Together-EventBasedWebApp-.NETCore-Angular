import { Card, Typography } from "@mui/material";
import {
  UserEvent,
  convertUserEventToEnum,
  splitDateToMonthName,
} from "../../../../../../api/models/UserEvent";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Chip from "@mui/material/Chip";

export function EventCard({ userEvent }: { userEvent: UserEvent }) {
  const { sport, eventStatus, sportExperience } = convertUserEventToEnum(
    userEvent.sportId,
    userEvent.eventStatusId,
    userEvent.sportExperienceId
  );

  const eventDate = new Date(userEvent.eventDate);
  const { month } = splitDateToMonthName(eventDate);

  const chipColor =
    sportExperience === "Beginner"
      ? "success"
      : sportExperience === "Intermediate"
      ? "info"
      : sportExperience === "Advanced"
      ? "warning"
      : "error";

  return (
    <Card
      sx={{ boxShadow: 0 }}
      className="rounded-4 p-3 shadow"
      style={{ width: 315, height: 290 }}
    >
      <div className="d-flex flex-column align-items-center">
        <img
          src={
            userEvent.eventImageUrl
              ? userEvent.eventImageUrl
              : "https://eagleexaminer.com/wp-content/uploads/2018/04/boston-marathon-900x600.jpg"
          }
          alt="Event"
          className="rounded-3 shadow"
          width={283}
          height={140}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center mt-1">
        <div>
          <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-2">
            <Chip label={sportExperience} size="small" color={chipColor} />
            <Chip label={sport} size="small" />
          </div>
          <Typography variant="subtitle1" fontWeight="bold" className="mt-2">
            {userEvent.title}
          </Typography>
          <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
            <FmdGoodOutlinedIcon
              fontSize="inherit"
              style={{ color: "#929292" }}
            />
            <Typography variant="body2" style={{ color: "#929292" }}>
              {userEvent.city} / {userEvent.country}
            </Typography>
          </div>
          <div className="d-flex flex-row gap-2 align-items-center">
            <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
              <CalendarMonthRoundedIcon
                fontSize="inherit"
                style={{ color: "#929292" }}
              />
              <Typography variant="body2" style={{ color: "#929292" }}>
                {eventDate.getDay()} {month}
              </Typography>
            </div>
            <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
              <AccessTimeRoundedIcon
                fontSize="inherit"
                style={{ color: "#929292" }}
              />
              <Typography variant="body2" style={{ color: "#929292" }}>
                {eventDate.getHours()}:{eventDate.getMinutes()}
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-3 align-self-start"></div>
      </div>
    </Card>
  );
}
