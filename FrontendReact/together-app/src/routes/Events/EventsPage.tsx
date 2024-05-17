import { EventGrid } from "./components/EventGrid/EventGrid";
import { EventSearchCard } from "./components/EventSearchCard/EventSearchCard";

export function EventsPage() {
  return (
    <div className="d-flex flex-column gap-3 align-self-start">
      <EventSearchCard />
      <EventGrid />
    </div>
  );
}
