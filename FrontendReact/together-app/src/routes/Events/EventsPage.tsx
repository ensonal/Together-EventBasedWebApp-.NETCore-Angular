import { EventGrid } from "./components/EventGrid/EventGrid";
import { EventSearchCard } from "./components/EventSearchCard/EventSearchCard";
import Pagination from "@mui/material/Pagination";

export function EventsPage() {
  return (
    <div className="d-flex flex-column gap-3 align-self-start align-items-center">
      <EventSearchCard />
      <Pagination count={10} showFirstButton showLastButton />
      <EventGrid />
    </div>
  );
}
