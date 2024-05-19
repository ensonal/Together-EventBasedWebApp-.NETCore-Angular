import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import GrainIcon from "@mui/icons-material/Grain";
import { UserEvent } from "../../../api/models/UserEvent";
import { useNavigate } from "react-router-dom";

export function EventBreadCrumbs({ event }: { event?: UserEvent }) {
  const navigate = useNavigate();
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          onClick={() => navigate("/events")}
        >
          <AutoModeRoundedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Events
        </Link>
        {event && (
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {event.title}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
