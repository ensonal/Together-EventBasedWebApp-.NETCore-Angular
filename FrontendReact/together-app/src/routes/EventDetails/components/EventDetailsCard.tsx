import { Card, Typography } from "@mui/material";

export function EventDetailsCard({ detail }: { detail: string }) {
  return (
    <Card
      sx={{ boxShadow: 0, flex: 1.5 }}
      className="rounded-4 p-3"
      style={{ height: 'auto', overflow: "hidden" }}
    >
      <Typography variant="h6" className="mb-1">
        Event Details
      </Typography>
      <Typography variant="body1" className="mt-2">{detail}</Typography>
    </Card>
  );
}
