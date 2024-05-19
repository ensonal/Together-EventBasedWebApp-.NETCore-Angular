import { Card, TextField } from "@mui/material";
import { SportSelectForm } from "./SportSelectForm";
import { UploadEventImage } from "./UploadEventImage";
import { EventDatePicker } from "./EventDatePicker";
import Button from "@mui/material/Button";
import { useState } from "react";
import { UserEvent } from "../../../api/models/UserEvent";
import { addUserEvent } from "../../../api/services/EventService";

export function CreateEventCard() {
  const [userEvent, setUserEvent] = useState({} as UserEvent);

  const handleChange = (field: keyof UserEvent, value: any) => {
    setUserEvent((prevUserEvent) => ({
      ...prevUserEvent,
      [field]: value,
    }));
  };

  const createEvent = () => {
    addUserEvent(userEvent);
  };

  return (
    <Card className="p-4 rounded-3 gap-2">
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row gap-5">
          <UploadEventImage setUserEvent={setUserEvent} />
          <div className="d-flex flex-column gap-2 w-100">
            <p className="fs-5 m-0">Event title</p>
            <TextField
              className="w-100"
              variant="outlined"
              color="primary"
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <p className="fs-5 m-0 mt-2">Description</p>
            <textarea
              className="form-control w-100 h-100"
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </div>
        </div>
        <SportSelectForm setUserEvent={setUserEvent} />
        <EventDatePicker setUserEvent={setUserEvent} />
        <div className="d-flex flex-row w-100 gap-3">
          <div className="d-flex flex-column w-100">
            <p className="fs-5 m-0 mt-2">City</p>
            <TextField
              className="w-100"
              variant="outlined"
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <p className="fs-5 m-0 mt-2">Country</p>
            <TextField
              className="w-100"
              variant="outlined"
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <Button
          variant="contained"
          color="primary"
          fullWidth={false}
          onClick={() => createEvent()}
        >
          Create event
        </Button>
      </div>
    </Card>
  );
}
