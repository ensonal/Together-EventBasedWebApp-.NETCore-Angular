import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CreateEventCard } from "./components/CreateEventCard";

export function CreateEventPage() {

  return (
    <div className="pt-3" style={{ marginRight: "20%", marginLeft: "20%" }}>
      <div className="d-flex flex-row justify-content-start align-items-center gap-2 mb-2">
        <IconButton className="p-0" aria-label="back">
          <ArrowBackIcon className="p-0 text-dark" />
        </IconButton>
        <p className="fs-3 m-0 fw-normal">Create Event</p>
      </div>
      <CreateEventCard />
    </div>
  );
}