import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { SportSelectForm } from "../../CreateEvent/components/SportSelectForm";
import { EventDatePicker } from "../../CreateEvent/components/EventDatePicker";
import { UploadEventImage } from "../../CreateEvent/components/UploadEventImage";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";
import MapComponent from "./EditMapComponent";

export function EditEventCard({ event }: { event: any }) {
  const [userEvent, setUserEvent] = useState(event);

  const handleChange = (field: any, value: any) => {
    setUserEvent((prevUserEvent: any) => ({
      ...prevUserEvent,
      [field]: value,
    }));
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setUserEvent((prevUserEvent: any) => ({
      ...prevUserEvent,
      location: location,
    }));
  };

  const handleAddressSelect = (cityFromGeo: string, countryFromGeo: string) => {
    setUserEvent((prevUserEvent: any) => ({
      ...prevUserEvent,
      city: cityFromGeo,
      country: countryFromGeo,
    }));
  };

  const editEvent = () => {
    console.log(userEvent);
  };

  return (
    <Card className="p-4 rounded-3 gap-2 w-100">
      <div className="d-flex flex-column gap-2 w-100">
        <div className="d-flex flex-row gap-5 w-100">
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
            <RichTextEditor
              value={userEvent?.description}
              onTextChange={(content: string) =>
                handleChange("description", content)
              }
            />
          </div>
        </div>
        <div className="d-flex flex-row gap-5 w-100">
          <UploadEventImage setUserEvent={setUserEvent} event={userEvent} />
          <div className="d-flex flex-column w-100 mt-5">
            <SportSelectForm setUserEvent={setUserEvent} event={userEvent} />
          </div>
        </div>
        <p className="fs-5 m-0 mt-2">
          Location
        </p>
        <MapComponent
          onLocationSelect={handleLocationSelect}
          onAddressSelect={handleAddressSelect}
          preData={userEvent.location}
        />
        <EventDatePicker setUserEvent={setUserEvent} event={userEvent} />
        <div className="d-flex flex-row w-100 gap-3">
          <div className="d-flex flex-column w-100">
            <p className="fs-5 m-0 mt-2" style={{ color: "#808080" }}>
              City
            </p>
            <TextField
              value={userEvent?.city}
              className="w-100"
              variant="outlined"
              disabled
            />
          </div>
          <div className="d-flex flex-column w-100">
            <p className="fs-5 m-0 mt-2" style={{ color: "#808080" }}>
              Country
            </p>
            <TextField
              value={userEvent?.country}
              className="w-100"
              variant="outlined"
              disabled
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
