import { UserEvent } from "../../api/models/UserEvent";
import { EventInfoCard } from "./components/EventInfoCard";
import { EventImageCard } from "./components/EventImageCard";
import { GuestListCard } from "./components/GuestListCard";
import { EventDetailsCard } from "./components/EventDetailsCard";
import { EventMapViewCard } from "./components/EventMapViewCard";

export function EventDetailsContainer({ event }: { event: UserEvent }) {
  console.log(event);
  
  return (
    <div className="d-flex flex-column gap-3 mb-2">
      <div className="d-flex flex-row h-100 gap-3" style={{ width: "100%" }}>
        <EventImageCard event={event} />
        <EventInfoCard userEvent={event} />
      </div>
      <div className="d-flex flex-row h-100 gap-3" style={{ width: "100%" }}>
        <GuestListCard guests={event.guests} />
        <EventDetailsCard detail={event.description} />
      </div>
      <EventMapViewCard event={event}/>
    </div>
  );
}
