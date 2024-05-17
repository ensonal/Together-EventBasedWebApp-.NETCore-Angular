import { EventCard } from "./EventCard";
import Stack from "@mui/material/Stack";

export function EventGrid() {
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 3}}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {Array.from(Array(6)).map((_, index) => (
          <EventCard key={index} />
        ))}
      </Stack>
    </>
  );
}
