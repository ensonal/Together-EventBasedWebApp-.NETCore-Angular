import { Button, Card } from "@mui/material";
import { useState, useEffect } from "react";
import { UserEvent } from "../../../../api/models/UserEvent";
import { useNavigate } from "react-router-dom";
import { getUserEvents } from "../../../../api/services/EventService";
import { EventCard } from "./components/EventCard/EventCard";

export function MyEvents() {
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState([] as UserEvent[]);

  useEffect(() => {
    getUserEvents().then((response) => {
      setUserEvents(response);
    });
  }, []);

  return (
    <Card sx={{ padding: 3, paddingBottom: 1, boxShadow: 0 }}>
      <div className="rounded-3 w-100 pt-2 pb-2">
        <div className="d-flex flex-row flex-wrap gap-3 w-100 justify-content-center">
          {userEvents.map((event) => (
            <EventCard key={event.userEventId} {...event} />
          ))}
          <div className="text-center mt-2 w-100">
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => navigate("/create-event")}
            >
              Create new event
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
