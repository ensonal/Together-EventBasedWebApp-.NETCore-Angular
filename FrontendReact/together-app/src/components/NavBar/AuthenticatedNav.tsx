import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IUserInfo from "../../api/models/UserInfo";
import { IconButton } from "@mui/material";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export function AuthenticatedNav({ user }: { user: IUserInfo }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 0,
        gap: 4,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        className="rounded-5"
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={() => navigate("/create-event")}
      >
        Create
      </Button>
      <div className="d-flex flex-row align-items-center gap-3">
        <img
          src={user.profileImageUrl}
          alt="profile"
          width={50}
          height={50}
          className="rounded-circle shadow-lg"
          style={{ objectFit: "cover", cursor: "pointer" }}
          onClick={() => navigate("/my-profile")}
        />
        <div>
          <Typography variant="subtitle2" color={"#313634"}>
            Welcome back,
          </Typography>
          <Typography variant="subtitle2" color={"#313634"}>
            {user.name}
          </Typography>
        </div>
        <IconButton onClick={() => console.log("Clicked")}>
          <ExpandCircleDownRoundedIcon color="primary" />
        </IconButton>
      </div>
    </Box>
  );
}
