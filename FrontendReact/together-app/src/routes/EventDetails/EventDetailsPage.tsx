import React, { useEffect, useState } from "react";
import { getEventById } from "../../api/services/EventService";
import { useParams } from "react-router-dom";
import { UserEvent } from "../../api/models/UserEvent";
import { EventBreadCrumbs } from "./components/EventBreadCrumbs";

export function EventDetailsPage() {
  const [event, setEvent] = useState<UserEvent | undefined>(undefined);
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      const numericEventId = parseInt(eventId, 10);
      getEventById(numericEventId).then((res) => {
        setEvent(res);
      });
    }
  }, [eventId]);

  return (
    <div>
      <div role="presentation">
        <EventBreadCrumbs event={event} />
      </div>
    </div>
  );
}
