import { Divider } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export function SendMessage() {
  return (
    <div className="d-flex flex-column justify-content-start gap-1">
      <Divider />
      <div className="d-flex flex-row justify-content-between align-items-center gap-3 p-2 ps-3 pe-3 w-100">
        <input
          type="text"
          placeholder="Write a message"
          className="form-control"
        />
        <SendRoundedIcon style={{ cursor: "pointer" }} htmlColor="#707070"/>
      </div>
    </div>
  );
}
