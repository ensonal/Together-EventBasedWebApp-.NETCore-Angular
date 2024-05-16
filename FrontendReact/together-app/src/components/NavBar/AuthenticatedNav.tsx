import { Box, IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useNavigate } from "react-router-dom";

export function AuthenticatedNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton sx={{ color: "3D52F3" }} size="large" onClick={() => navigate("/")}>
        <HomeRoundedIcon sx={{ color: "#3D52F3" }} fontSize="inherit" />
      </IconButton>
      <IconButton sx={{ color: "#3D52F3" }} size="large">
        <CalendarMonthRoundedIcon sx={{ color: "#3D52F3" }} fontSize="inherit" />
      </IconButton>
      <IconButton sx={{ color: "#3D52F3" }} size="large">
        <ChatRoundedIcon sx={{ color: "#3D52F3" }} fontSize="inherit" />
      </IconButton>
      <IconButton sx={{ color: "#3D52F3" }} size="large" onClick={() => navigate("/my-profile")}>
        <PersonRoundedIcon sx={{ color: "#3D52F3" }} fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
