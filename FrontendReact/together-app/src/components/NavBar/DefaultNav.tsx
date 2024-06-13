import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function DefaultNav({ isLandinPage }: { isLandinPage: boolean }) {
  const navigate = useNavigate();

  if (isLandinPage) {
    return (
      null
    );
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button
        variant="outlined"
        sx={{ marginRight: 1 }}
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
      <Button variant="outlined" onClick={() => navigate("/login")}>
        Login
      </Button>
    </Box>
  );
}
