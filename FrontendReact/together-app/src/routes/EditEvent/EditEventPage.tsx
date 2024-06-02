import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../../api/services/EventService";
import { EditEventCard } from "./components/EditEventCard";
import { Button } from "@mui/material";
import { deleteUserEvent } from "../../api/services/EventService";

export function EditEventPage() {
  const [event, setEvent] = useState<any>();
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      const numericEventId = parseInt(eventId, 10);
      getEventById(numericEventId).then((res) => {
        setEvent(res);
      });
    }
  }, [eventId]);

  const deleteEvent = async () => {
    const response = await deleteUserEvent(event.userEventId);
    if (response) {
      window.location.href = "/events";
    }
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center gap-2 mb-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <IconButton className="p-0" aria-label="back">
            <ArrowBackIcon className="p-0 text-dark" />
          </IconButton>
          <p className="fs-3 m-0 fw-normal">Edit Event</p>
        </div>
        <Button variant="outlined" color="error" onClick={deleteEvent}>
          Delete event
        </Button>
      </div>
      {event && <EditEventCard event={event} />}
    </>
  );
}
