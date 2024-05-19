import { EventGrid } from "./components/EventGrid/EventGrid";
import { EventSearchCard } from "./components/EventSearchCard/EventSearchCard";
import Pagination from "@mui/material/Pagination";
import { UserEvent } from "../../api/models/UserEvent";
import { getAllEvents } from "../../api/services/EventService";
import { useEffect, useState } from "react";
import { EventFilters } from "../../api/models/EventModels/EventFilters";

export function EventsPage() {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);

  const [filters, setFilters] = useState<EventFilters>({} as EventFilters);

  useEffect(() => {
    getAllEvents(filters).then((response) => {
      setUserEvents(response);
    });
  }, [filters]);

  return (
    <div className="d-flex flex-column gap-3 align-self-start align-items-center">
      <EventSearchCard filters={filters} setFilters={setFilters} />
      <EventGrid userEvents={userEvents} />
      <div className="d-flex justify-content-center mb-3">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
}
