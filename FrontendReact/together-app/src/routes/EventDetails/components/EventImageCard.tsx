import { Card } from "@mui/material";
import { UserEvent } from "../../../api/models/UserEvent";

export function EventImageCard({ event }: { event: UserEvent }) {
  return (
    <Card
      sx={{ boxShadow: 0, flex: 1.5 }}
      className="rounded-4 p-3"
      style={{ height: 330, overflow: "hidden" }}
    >
      <img
        src={event?.eventImageUrl}
        alt="Event"
        className="rounded-3 shadow"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </Card>
  );
}
