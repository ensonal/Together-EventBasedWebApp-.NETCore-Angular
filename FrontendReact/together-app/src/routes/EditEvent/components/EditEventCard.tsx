import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { SportSelectForm } from "../../CreateEvent/components/SportSelectForm";
import { EventDatePicker } from "../../CreateEvent/components/EventDatePicker";
import { UploadEventImage } from "../../CreateEvent/components/UploadEventImage";

export function EditEventCard({ event }: { event: any }) {
  const [userEvent, setUserEvent] = useState(event);

  const handleChange = (field: any, value: any) => {
    setUserEvent((prevUserEvent: any) => ({
      ...prevUserEvent,
      [field]: value,
    }));
  };

  const editEvent = () => {
    console.log(userEvent);
  };

  return (
    <Card className="p-4 rounded-3 gap-2">
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row gap-5">
          <UploadEventImage setUserEvent={setUserEvent} event={userEvent} />
          <div className="d-flex flex-column gap-2 w-100">
            <p className="fs-5 m-0">Event title</p>
            <TextField
              value={userEvent?.title}
              className="w-100"
              variant="outlined"
              color="primary"
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <p className="fs-5 m-0 mt-2">Description</p>
            <textarea
              value={userEvent?.description}
              className="form-control w-100 h-100"
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </div>
        </div>
        <SportSelectForm setUserEvent={setUserEvent} event={userEvent} />
        <EventDatePicker setUserEvent={setUserEvent} event={userEvent}/>
        <div className="d-flex flex-row w-100 gap-3">
          <div className="d-flex flex-column w-100">
            <p className="fs-5 m-0 mt-2">City</p>
            <TextField
            value={userEvent?.city}
              className="w-100"
              variant="outlined"
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <p className="fs-5 m-0 mt-2">Country</p>
            <TextField
                value={userEvent?.country}
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
          onClick={() => editEvent()}
        >
          Save changes
        </Button>
      </div>
    </Card>
  );
}
