import { Card, Typography } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Chip from "@mui/material/Chip";
import {
  UserEvent,
  splitDateToMonthName,
  convertUserEventToEnum,
} from "../../../../api/models/UserEvent";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addFavoriteEvent,
  removeFromFavorites,
} from "../../../../api/services/FavoriteService";
import { useState } from "react";

export function EventCard({ userEvent }: { userEvent: UserEvent }) {
  const { sport, eventStatus, sportExperience } = convertUserEventToEnum(
    userEvent.sportId,
    userEvent.eventStatusId,
    userEvent.sportExperienceId
  );
  const [isFavorite, setIsFavorite] = useState(userEvent.isFavorite);
  const eventDate = new Date(userEvent.eventDate);
  const { month } = splitDateToMonthName(eventDate);

  const chipColor =
    sportExperience === "Beginner"
      ? "success"
      : sportExperience === "Intermediate"
      ? "info"
      : sportExperience === "Advanced"
      ? "warning"
      : sportExperience === "AllLevels"
      ? "primary"
      : "error";

  const favIconColor = isFavorite ? "#FA4A4C" : "#929292";
  const favIconShadow = isFavorite ? "drop-shadow(0 4px 8px rgba(250, 74, 76, 0.6))" : "";

  const navigate = useNavigate();

  const handleFavClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFavorite) {
      setIsFavorite(false);
      removeFromFavorites(userEvent.userEventId);
    } else {
      setIsFavorite(true);
      addFavoriteEvent(userEvent.userEventId);
    }
  };

  return (
    <Card
      sx={{ boxShadow: 0 }}
      className="rounded-4 p-3 shadow-sm w-100"
      style={{ height: "auto", cursor: "pointer" }}
      onClick={() => navigate(`/event/${userEvent.userEventId}`)}
    >
      <div className="d-flex flex-row w-100 align-items-center">
        <div className="d-flex flex-column">
          <img
            src={
              userEvent.eventImageUrl
                ? userEvent.eventImageUrl
                : "https://eagleexaminer.com/wp-content/uploads/2018/04/boston-marathon-900x600.jpg"
            }
            alt="Event"
            className="rounded-3 shadow"
            width={170}
            height={95}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="d-flex flex-column ms-3 w-100 gap-3 align-self-start">
          <div className="d-flex flex-row justify-content-between align-items-center w-100">
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {userEvent.title}
            </Typography>
            <div className="d-flex flex-row gap-1 flex-wrap">
              <Chip
                label={sportExperience}
                size="small"
                color={chipColor}
                className="rounded-2"
              />
              <Chip label={sport} size="small" className="rounded-2" />
              <FavoriteIcon
                style={{ color: favIconColor, cursor: "pointer" }}
                onClick={handleFavClick}
                sx={{ filter: favIconShadow }}
              />
            </div>
          </div>
          <div className="d-flex flex-column overflow-hidden">
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
                  {eventDate.getDate()} {month}
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
        </div>
      </div>
    </Card>
  );
}
