import { Divider, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export function MessagePanelHeader() {
  return (
    <div className="d-flex flex-column w-100 justify-content-start">
      <div className="d-flex flex-row justify-content-between align-items-center p-2 ps-3 pe-3 w-100">
        <div className="d-flex flex-column w-100">
          <Typography variant="body1" fontWeight="medium">
            Kaş Camping Meet
          </Typography>
          <Typography variant="body2">23 members, 10 online</Typography>
        </div>
        <InfoOutlinedIcon />
      </div>
      <Divider />
    </div>
  );
}
