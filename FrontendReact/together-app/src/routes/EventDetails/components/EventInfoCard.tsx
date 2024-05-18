import React from "react";
import { UserEvent } from "../../../api/models/UserEvent";
import { Box } from "@mui/system";
import {
  convertUserEventToEnum,
  splitDateToMonthName,
} from "../../../api/models/UserEvent";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Button, Card, Divider, Typography } from "@mui/material";
import { EventOwnerInfo } from "./EventOwnerInfo";

export function EventInfoCard({ event }: { event: UserEvent }) {
  const { sport, eventStatus, sportExperience } = convertUserEventToEnum(
    event?.sportId,
    event?.eventStatusId,
    event?.sportExperienceId
  );

  const eventDate = new Date(event.eventDate);
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
    <Box className="d-flex flex-column gap-3 ms-3 h-100" sx={{ flex: 1 }}>
      <Card className="rounded-4 p-3" sx={{ height: 330, boxShadow: 0 }}>
        <div className="d-flex flex-column gap-2">
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: 20, color: "#404040" }}
          >
            {event?.title}
          </Typography>
          <div className="d-flex flex-row justify-content-start gap-1 mt-1">
            <Chip
              label={sportExperience}
              size="small"
              color={chipColor}
              className="rounded-2"
            />
            <Chip label={sport} size="small" className="rounded-2" />
          </div>
          <div>
            <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-2">
              <FmdGoodIcon style={{ color: "#505050" }} fontSize="small" />
              <Typography
                variant="body2"
                style={{ color: "#505050", fontSize: 16 }}
              >
                {event.location}
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
          </div>
        </div>
        <Divider className="mt-3 mb-3" />
        <EventOwnerInfo event={event} />
        <Divider className="mt-3 mb-3" />
        <Button variant="contained" color="primary" fullWidth>
          Join event
        </Button>
      </Card>
    </Box>
  );
}
