import { Card } from "@mui/material";
import IUserInfo from "../../../api/models/UserInfo";

export function UserImageView({ user }: { user?: IUserInfo }) {
  return (
    <Card
      sx={{ boxShadow: 0 }}
      className="rounded-4 p-3 d-flex flex-column justify-content-center align-items-center"
      style={{ height: "auto", overflow: "hidden" }}
    >
      <img
        src={user?.profileImageUrl ? user.profileImageUrl : "https://togetherwebapp.blob.core.windows.net/userprofileimages/people.png"}
        alt="Event"
        className="rounded-circle shadow"
        style={{ objectFit: "cover" }}
        width={200}
        height={200}
      />
    </Card>
  );
}
