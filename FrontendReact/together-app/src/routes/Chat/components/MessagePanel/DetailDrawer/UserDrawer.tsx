import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function UserDrawer({ user }: any) {
  const navigate = useNavigate();

  const handleClick = (userID: number) => {
    navigate(`/user/${userID}`);
  };
  return (
    <div
      className="d-flex flex-column gap-2 mt-2"
      style={{ cursor: "pointer" }}
      onClick={() => handleClick(user.userID)}
    >
      <Box className="d-flex flex-row gap-3 p-0">
        <img
          src={
            user.profileImageUrl
              ? user.profileImageUrl
              : "https://togetherwebapp.blob.core.windows.net/userprofileimages/people.png"
          }
          alt="guest"
          className="rounded-circle"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div className="d-flex flex-column gap-0">
          <Typography variant="body1">
            {user.name} {user.surname}{" "}
          </Typography>
          <Typography variant="body1" style={{ color: "#505050" }}>
            {" "}
            ({user.userName})
          </Typography>
        </div>
      </Box>
    </div>
  );
}
