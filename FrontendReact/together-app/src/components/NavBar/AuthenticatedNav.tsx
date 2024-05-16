import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IUserInfo from '../../api/models/UserInfo';

export function AuthenticatedNav({ user }: { user: IUserInfo }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 0, gap: 2, display: "flex", flexDirection:'row', alignItems:'center' }}>
      <Button variant="outlined" sx={{maxHeight:'40px'}} size="medium" onClick={() => navigate("/create-event")}>
        Create Event
      </Button>
      <img
        src={user.profileImageUrl}
        alt="profile"
        width={50}
        height={50}
        className="rounded-circle shadow-lg"
        style={{ objectFit: "cover", cursor: "pointer"}}
        onClick={() => navigate("/my-profile")}
      />
    </Box>
  );
}
