import { UserEvent } from "../../api/models/UserEvent";
import { EventInfoCard } from "./components/EventInfoCard";
import { EventImageCard } from "./components/EventImageCard";

export function EventDetailsContainer({ event }: { event: UserEvent }) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row h-100" style={{ width: "100%" }}>
        <EventImageCard event={event} />
        <EventInfoCard event={event} />
      </div>
    </div>
  );
}
