import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function DefaultNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 0 }}>
        <Button variant="contained" color="secondary" sx={{marginRight: 1}} onClick={() => navigate("/register")}>
          Register
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/login")} >
          Login
        </Button>
    </Box>
  );
}
