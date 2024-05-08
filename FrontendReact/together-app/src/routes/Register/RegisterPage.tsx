import { Box } from "@mui/material";
import { Register } from "../Register";
import combineLogo from "../../assets/images/logo/combineLogo.png";

export function RegisterPage() {
  return (
    <div className="d-flex flex-column vh-100 align-items-center">
      <Box>
        <img src={combineLogo} alt="logo" />
      </Box>
      <Register />
    </div>
  );
}
