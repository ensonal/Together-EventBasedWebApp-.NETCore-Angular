import { EventCard } from "./EventCard";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { UserEvent } from "../../../../api/models/UserEvent";
import { getAllEvents } from "../../../../api/services/EventService";

export function EventGrid() {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);

  useEffect(() => {
    getAllEvents().then((response) => {
      setUserEvents(response);
    });
  }, []);


  return (
    <>
      <Stack
        spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {userEvents.map((userEvent) => (
          <EventCard key={userEvent.userEventId} userEvent={userEvent} />
        ))}
      </Stack>
    </>
  );
}