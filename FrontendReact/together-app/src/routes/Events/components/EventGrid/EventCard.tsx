import { Card, Typography } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Chip from "@mui/material/Chip";

export function EventCard() {
  return (
    <Card
      sx={{ boxShadow: 0 }}
      className="rounded-4 p-3"
      style={{ width: 350, height: 285 }}
    >
      <div className="d-flex flex-column align-items-center">
        <img
          src="https://eagleexaminer.com/wp-content/uploads/2018/04/boston-marathon-900x600.jpg"
          alt="Event"
          className="rounded-3 shadow"
          width={320}
          height={140}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center mt-1">
        <div>
          <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
            <Chip label="Road Running" size="small" />
            <Chip label="Expert" size="small" color="error" />
          </div>
          <Typography variant="subtitle1" fontWeight="bold" className="mt-2">
            3rd Annual Marathon
          </Typography>
          <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
            <FmdGoodOutlinedIcon
              fontSize="inherit"
              style={{ color: "#929292" }}
            />
            <Typography variant="body2" style={{ color: "#929292" }}>
              Bowen University
            </Typography>
          </div>
          <div className="d-flex flex-row gap-2 align-items-center">
            <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
              <CalendarMonthRoundedIcon
                fontSize="inherit"
                style={{ color: "#929292" }}
              />
              <Typography variant="body2" style={{ color: "#929292" }}>
                12 Sep
              </Typography>
            </div>
            <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
              <AccessTimeRoundedIcon
                fontSize="inherit"
                style={{ color: "#929292" }}
              />
              <Typography variant="body2" style={{ color: "#929292" }}>
                05:00 PM
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-3 align-self-start"></div>
      </div>
    </Card>
  );
}
