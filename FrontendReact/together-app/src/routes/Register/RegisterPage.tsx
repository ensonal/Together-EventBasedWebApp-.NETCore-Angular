import { Box } from "@mui/system";
import { Register } from "../Register";
import { RegisterImageContainer } from "./RegisterImageContainer/RegisterImageContainer";

export function RegisterPage() {
  return (
    <div className="d-flex flex-row vh-100">
      <Box sx={{ flex: 1 }}>
        <RegisterImageContainer />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Register />
      </Box>
    </div>
  );
}
