import { Card, Typography } from "@mui/material";
import {
  UserEvent,
  convertUserEventToEnum,
  splitDateToMonthName
} from "../../../../../../api/models/UserEvent";
import { useEffect, useState } from "react";
import { EventActionButtons } from "./EventActionButtons";

export function EventCard(event: UserEvent) {
  const { sport, eventStatus, sportExperience } = convertUserEventToEnum(
    event.sportId,
    event.eventStatusId,
    event.sportExperienceId
  );
  const eventDate = new Date(event.eventDate);
  const [trimmedDescription, setTrimmedDescription] = useState("");

  useEffect(() => {
    setTrimmedDescription(event.description.substring(0, 32));
  }, [event.description]);


  return (
    <Card
      sx={{ width: 350, height: 275, position: "relative" }}
      variant="outlined"
      className="shadow rounded-3"
    >
      <EventActionButtons userEventId={event.userEventId} />
      <img
        src={event.eventImageUrl}
        alt="event"
        width={350}
        height={150}
        style={{ objectFit: "cover" }}
      />
      <div
        className="d-flex flex-row align-items-center p-3 h-50 gap-5"
        style={{ width: "350px" }}
      >
        <div className="d-flex flex-column text-center h-100">
          <div className="d-flex flex-column text-center h-100">
            <p>{splitDateToMonthName(eventDate).month}</p>
            <p>{eventDate.getDate()}</p>
          </div>
        </div>
        <div className="d-flex flex-column gap-3 h-100 w-100">
          <div className="d-flex flex-row justify-content-between w-100">
            <p className="m-0">{event.title}</p>
            <Typography variant="inherit" className="m-0" color="primary">
              {sport}
            </Typography>
          </div>
          <div className="d-flex flex-column">
            <Typography
              variant="caption"
              className="m-0"
              noWrap={true}
              style={{
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {trimmedDescription}...
            </Typography>
            <Typography variant="caption" className="m-0">
              {event.location}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}
