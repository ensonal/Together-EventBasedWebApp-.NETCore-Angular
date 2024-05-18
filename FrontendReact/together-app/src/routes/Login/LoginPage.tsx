import { Box } from "@mui/material";
import { Login } from "../Login";
import { LoginImageContainer } from "./LoginImageContainer/LoginImageContainer";

export function LoginPage() {

  return (
    <div className="d-flex flex-row vh-100">
      <Box sx={{ flex: 1 }}>
        <LoginImageContainer />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Login />
      </Box>
    </div>
  );
}
