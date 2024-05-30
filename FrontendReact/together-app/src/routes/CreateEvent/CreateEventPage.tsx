import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CreateEventCard } from "./components/CreateEventCard";
import { Typography } from "@mui/material";

export function CreateEventPage() {
  return (
    <>
      <div className="d-flex flex-row justify-content-start align-items-center gap-2 mb-2">
        <IconButton className="p-0" aria-label="back">
          <ArrowBackIcon className="p-0 text-dark" />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#303030" }}>
          Create Event
        </Typography>
      </div>
      <CreateEventCard />
    </>
  );
}
