import React, { useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import placeholder from "../../../assets/images/placeholder.png";

export function MapCard({ allEvents }: { allEvents: any }) {
  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "10px",
  };

  const center = {
    lat: 39.0082,
    lng: 28.9784,
  };

  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <Card
      sx={{ boxShadow: 0, flex: 1.5 }}
      className="rounded-4 p-3"
      style={{ overflow: "hidden" }}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {allEvents.map((event: any) => (
          <Marker
            icon={{
              url: placeholder,
              scaledSize: new window.google.maps.Size(35, 35),
            }}
            key={event.userEventId}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
        {selectedEvent && (
          <InfoWindow
            position={{
              lat: selectedEvent.latitude,
              lng: selectedEvent.longitude,
            }}
            onCloseClick={() => setSelectedEvent(null)}
          >
            <Card className="d-flex flex-column gap-2 align-items-center">
              <Typography
                variant="body1"
                fontWeight={"medium"}
                sx={{ color: "#1c1c1c" }}
              >
                {selectedEvent.title}
              </Typography>
              <img
                src={selectedEvent.eventImageUrl}
                alt={selectedEvent.title}
                style={{ width: "100%", height: "100px" }}
                className="rounded-2"
              />
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() =>
                  (window.location.href = `/event/${selectedEvent.userEventId}`)
                }
              >
                View Event
              </Button>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
    </Card>
  );
}
