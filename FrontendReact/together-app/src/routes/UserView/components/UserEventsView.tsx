import { Card, Typography } from "@mui/material";
import { UserEvent } from "../../../api/models/UserEvent";
import { EventCard } from "../../EventHome/components/EventGrid/EventCard";

export function UserEventsView({ userEvents }: { userEvents?: UserEvent[] }) {
  return (
    <Card
      className="rounded-4 p-3"
      style={{ height: "auto", overflow: "hidden", flex:1}}
      sx={{ boxShadow: 0 }}
    >
      <div className="d-flex flex-row justify-content-between">
        <Typography variant="h6">Events</Typography>
        <Typography variant="body1">
          Show all
        </Typography>
      </div>
      <div className="d-flex flex-row gap-3 flex-wrap justify-content-center">
        {userEvents
          ? userEvents.map((event) => (
              <EventCard key={event.userEventId} userEvent={event} />
            ))
          : null}
      </div>
    </Card>
  );
}
