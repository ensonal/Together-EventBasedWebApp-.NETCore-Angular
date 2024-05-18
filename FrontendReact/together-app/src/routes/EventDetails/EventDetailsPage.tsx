import React, { useEffect, useState } from "react";
import { getEventById } from "../../api/services/EventService";
import { useParams } from "react-router-dom";
import { UserEvent } from "../../api/models/UserEvent";
import { EventBreadCrumbs } from "./components/EventBreadCrumbs";
import { EventDetailsContainer } from "./EventDetailsContainer";

export function EventDetailsPage() {
  const [event, setEvent] = useState<UserEvent>();
  const { eventId } = useParams();

  console.log(event);

  useEffect(() => {
    if (eventId) {
      const numericEventId = parseInt(eventId, 10);
      getEventById(numericEventId).then((res) => {
        setEvent(res);
      });
    }
  }, [eventId]);

  return (
    <div className="d-flex flex-column gap-3 align-self-start">
      <EventBreadCrumbs event={event} />
      {event ? <EventDetailsContainer event={event} /> : null}
    </div>
  );
}
