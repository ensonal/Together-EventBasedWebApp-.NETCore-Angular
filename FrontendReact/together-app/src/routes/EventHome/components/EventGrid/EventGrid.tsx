import { EventCard } from "./EventCard";
import Stack from "@mui/material/Stack";
import { UserEvent } from "../../../../api/models/UserEvent";

export function EventGrid({ userEvents }: { userEvents: UserEvent[]}) {
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