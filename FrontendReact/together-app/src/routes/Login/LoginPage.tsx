import { Box } from "@mui/material";
import combineLogo from "../../assets/images/logo/combineLogo.png";
import { Login } from "../Login";

export function LoginPage() {

  return (
    <div className="d-flex flex-column vh-100 align-items-center">
      <Box>
        <img src={combineLogo} alt="logo" />
      </Box>
      <Login />
    </div>
  );
}
