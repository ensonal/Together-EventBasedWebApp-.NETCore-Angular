import { useState, useEffect } from "react";
import { UserEvent } from "../../api/models/UserEvent";
import { getFavoriteEvents } from "../../api/services/FavoriteService";
import { EventCard } from "../EventHome/components/EventGrid/EventCard";
import { Typography } from "@mui/material";

export function FavoriteEventsPage() {
  const [favoriteEvents, setFavoriteEvents] = useState<UserEvent[]>([]);

  useEffect(() => {
    getFavoriteEvents().then((response) => {
      setFavoriteEvents(response);
    });
  }, []);

  return (
    <div className="d-flex flex-column gap-3 w-100">
      <Typography variant="h6" sx={{color:"#303030"}}>
        My Favorite Events
      </Typography>
      {favoriteEvents.map((event) => (
        <EventCard key={event.userEventId} userEvent={event} />
      ))}
    </div>
  );
}
