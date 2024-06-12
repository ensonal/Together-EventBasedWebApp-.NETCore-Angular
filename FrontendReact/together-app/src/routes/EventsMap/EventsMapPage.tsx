import { Typography } from "@mui/material";
import { MapCard } from "./components/MapCard";
import { useEffect, useState } from "react";
import { getEventsForMap } from "../../api/services/EventService";

export function EventsMapPage() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    getEventsForMap().then((events) => {
      setAllEvents(events);
    });
  }, []);

  return (
    <div className="d-flex flex-column gap-3 w-100 h-100">
      <Typography variant="h6" sx={{ color: "#303030" }}>
        Events Map
      </Typography>
      <MapCard allEvents={allEvents} />
    </div>
  );
}
