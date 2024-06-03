import { Typography } from "@mui/material";
import { UserEvent } from "../../../api/models/UserEvent";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ShareLocationRoundedIcon from "@mui/icons-material/ShareLocationRounded";
import { useNavigate } from "react-router-dom";

export function EventOwnerInfo({ userEvent }: { userEvent: UserEvent }) {
  const navigate = useNavigate();

  const handleUserViewClick = () => {
    navigate(`/user/${userEvent.userInfo.userID}`);
  };

  return (
    <div
      className="d-flex flex-row gap-3"
      style={{ cursor: "pointer" }}
      onClick={() => handleUserViewClick()}
    >
      <img
        src={
          userEvent?.userInfo.profileImageUrl
            ? userEvent?.userInfo.profileImageUrl
            : "https://togetherwebapp.blob.core.windows.net/userprofileimages/people.png"
        }
        alt="profile"
        className="rounded-circle shadow"
        style={{ width: 50, height: 50, objectFit: "cover" }}
      />
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row gap-2 align-items-center">
          <PersonOutlineRoundedIcon
            style={{ color: "#505050" }}
            fontSize="small"
          />
          <Typography
            variant="body2"
            style={{ color: "#505050", fontSize: 16 }}
          >
            {userEvent?.userInfo.name} {userEvent?.userInfo.surname} (
            {userEvent?.userInfo.userName})
          </Typography>
        </div>
        <div className="d-flex flex-row gap-2 align-items-center">
          <ShareLocationRoundedIcon
            style={{ color: "#505050" }}
            fontSize="small"
          />
          <Typography
            variant="body2"
            style={{ color: "#505050", fontSize: 16 }}
          >
            {userEvent?.userInfo.city} - {userEvent?.userInfo.country}
          </Typography>
        </div>
      </div>
    </div>
  );
}
