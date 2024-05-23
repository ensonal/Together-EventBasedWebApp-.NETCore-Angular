import { Card, Typography } from "@mui/material";
import { UserEvent } from "../../../api/models/UserEvent";
import { UserEventCardView } from "./UserEventCardView";

export function UserEventsView({ userEvents }: { userEvents?: UserEvent[] }) {
  return (
    <Card
      className="rounded-4 p-3"
      style={{ height: "auto", overflow: "hidden", flex: 1 }}
      sx={{ boxShadow: 0 }}
    >
      <div className="d-flex flex-row justify-content-between">
        <Typography variant="h6">Events</Typography>
        <Typography variant="body1">
          {userEvents!.length > 3 ? "Show all" : ""}
        </Typography>
      </div>
      <div className="d-flex flex-row gap-3 mt-2 flex-wrap justify-content-center">
        {userEvents && userEvents.length > 4
          ? userEvents.slice(0, 4).map((event) => (
              <UserEventCardView key={event.userEventId} userEvent={event} />
            ))
          : userEvents!.map((event) => (
              <UserEventCardView key={event.userEventId} userEvent={event} />
            ))}
      </div>
    </Card>
  );
}
