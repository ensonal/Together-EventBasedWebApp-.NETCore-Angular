import { Card, Typography } from "@mui/material";
import IUserInfo from "../../../api/models/UserInfo";
import ShareLocationRoundedIcon from "@mui/icons-material/ShareLocationRounded";

export function UserInfoView({ user }: { user?: IUserInfo }) {
  return (
    <Card sx={{ boxShadow: 0 }} className="rounded-4 p-3 flex-grow-1">
      <div className="d-flex flex-column gap-2">
        <>
          <Typography variant="h6">
            {user?.name} {user?.surname}
          </Typography>
          <div className="d-flex flex-row align-items-center gap-2">
            <ShareLocationRoundedIcon fontSize="small" />
            <Typography variant="subtitle1">
              {user?.city} / {user?.country}
            </Typography>
          </div>
        </>
        <div>
          <Typography>

          </Typography>
        </div>
      </div>
    </Card>
  );
}
