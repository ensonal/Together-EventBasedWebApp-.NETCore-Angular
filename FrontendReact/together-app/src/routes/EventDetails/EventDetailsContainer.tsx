import { UserEvent } from "../../api/models/UserEvent";
import { EventInfoCard } from "./components/EventInfoCard";
import { EventImageCard } from "./components/EventImageCard";
import { Card } from "@mui/material";

export function EventDetailsContainer({ event }: { event: UserEvent }) {
  return (
    <div className="d-flex flex-column gap-3 mb-2">
      <div className="d-flex flex-row h-100 gap-3" style={{ width: "100%" }}>
        <EventImageCard event={event} />
        <EventInfoCard event={event} />
      </div>
      <div>
        <Card className="rounded-4 p-3 w-100" sx={{ boxShadow: 0 }}>
          <iframe
            className="rounded-3 shadow w-100"
            width="auto"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            title="Event Location"
            src="https://www.google.com/maps/embed/v1/place?q=Meltem%2C%20Watersports%20Antalya%20Konyaalt%C4%B1%20Beach%20Park%2C%20Konyaalt%C4%B1%20Plaj%C4%B1%2C%20Muratpa%C5%9Fa%2FAntalya%2C%20T%C3%BCrkiye&key=AIzaSyC_eoA_EAlj40eZ4g2qJdyqyRmOKIHO0FE"
          ></iframe>
        </Card>
      </div>
    </div>
  );
}
