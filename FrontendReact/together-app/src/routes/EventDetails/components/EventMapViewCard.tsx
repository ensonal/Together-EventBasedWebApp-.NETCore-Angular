import { Card, Typography } from "@mui/material";

export function EventMapViewCard({ event }: { event: any }) {
  const location = event?.location;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDPdMM-l-_4b5wAVNvMkiFcntGELSqvyGA&q=${location?.latitude},${location?.longitude}&zoom=14`;

  return (
    <Card
      sx={{ boxShadow: 0, flex: 1.5 }}
      className="rounded-4 p-3"
      style={{ height: 470, overflow: "hidden" }}
    >
      <Typography variant="h6" className="mb-1">
        Location
      </Typography>
      <iframe
      title="map"
        width="100%"
        height="400"
        className="rounded-3 shadow-sm"
        style={{ border: 0}}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </Card>
  );
}
