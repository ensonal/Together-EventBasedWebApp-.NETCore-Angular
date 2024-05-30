import { Card, Typography } from "@mui/material";

export function EventMapViewCard({event}: {event: any}) {
  console.log(event);
  const location = event?.location
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=600x300&maptype=roadmap
  &markers=color:red%7C${location?.latitude},${location?.longitude}&key=AIzaSyDPdMM-l-_4b5wAVNvMkiFcntGELSqvyGA`;

  return (
    <Card
      sx={{ boxShadow: 0, flex: 1.5 }}
      className="rounded-4 p-3"
      style={{ height: 280, overflow: "hidden" }}
    >
      <Typography variant="h6" className="mb-1">
        Location
      </Typography>
      <img src={mapUrl} alt="Event Location" className="w-100 rounded-3" />
    </Card>
  );
}
