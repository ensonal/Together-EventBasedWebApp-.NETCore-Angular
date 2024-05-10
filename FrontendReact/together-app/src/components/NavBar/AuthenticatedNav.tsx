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
      <IconButton sx={{ color: "white" }} size="large" onClick={() => navigate("/")}>
        <HomeRoundedIcon sx={{ color: "white" }} fontSize="inherit" />
      </IconButton>
      <IconButton sx={{ color: "white" }} size="large">
        <CalendarMonthRoundedIcon sx={{ color: "white" }} fontSize="inherit" />
      </IconButton>
      <IconButton sx={{ color: "white" }} size="large">
        <ChatRoundedIcon sx={{ color: "white" }} fontSize="inherit" />
      </IconButton>
      <IconButton sx={{ color: "white" }} size="large" onClick={() => navigate("/my-profile")}>
        <PersonRoundedIcon sx={{ color: "white" }} fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
