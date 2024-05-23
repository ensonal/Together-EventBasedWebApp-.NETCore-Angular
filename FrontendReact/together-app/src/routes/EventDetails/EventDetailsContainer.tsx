import { UserEvent } from "../../api/models/UserEvent";
import { EventInfoCard } from "./components/EventInfoCard";
import { EventImageCard } from "./components/EventImageCard";
import { Card } from "@mui/material";

export function EventDetailsContainer({ event }: { event: UserEvent }) {
  return (
    <div className="d-flex flex-column gap-3 mb-2">
      <div className="d-flex flex-row h-100 gap-3" style={{ width: "100%" }}>
        <EventImageCard event={event} />
        <EventInfoCard userEvent={event} />
      </div>
      <div>
        <Card className="rounded-4 p-3 w-100" sx={{ boxShadow: 0 }}>

        </Card>
      </div>
    </div>
  );
}
