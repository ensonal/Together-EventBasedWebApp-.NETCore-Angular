import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useNavigate } from "react-router-dom";
import { splitDateToMonthName } from "../../../../api/models/UserEvent";

export function OutEventRequestCard({ request }: { request: any }) {
  const navigate = useNavigate();

  const eventDate = new Date(request.eventView.eventDate);
  const { month } = splitDateToMonthName(eventDate);

  return (
    <Card
      className="rounded-4 p-3 shadow-sm w-100"
      style={{ height: "auto", cursor: "pointer", flex: 3 }}
      onClick={() => navigate(`/event/${request.eventView.userEventId}`)}
    >
      <div className="d-flex flex-row w-100 align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <img
            src={
              request.eventView.eventImageUrl
                ? request.eventView.eventImageUrl
                : "https://eagleexaminer.com/wp-content/uploads/2018/04/boston-marathon-900x600.jpg"
            }
            alt="Event"
            className="rounded-3 shadow"
            width={170}
            height={95}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="d-flex flex-column ms-3 w-100 gap-3 align-self-start">
          <div className="d-flex flex-row justify-content-between align-items-center w-100">
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {request.eventView.title}
            </Typography>
          </div>
          <div className="d-flex flex-column overflow-hidden">
            <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
              <FmdGoodOutlinedIcon
                fontSize="inherit"
                style={{ color: "#929292" }}
              />
              <Typography variant="body2" style={{ color: "#929292" }}>
                {request.eventView.city} / {request.eventView.country}
              </Typography>
            </div>
            <div className="d-flex flex-row gap-2 align-items-center">
              <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
                <CalendarMonthRoundedIcon
                  fontSize="inherit"
                  style={{ color: "#929292" }}
                />
                <Typography variant="body2" style={{ color: "#929292" }}>
                  {eventDate.getDate()} {month}
                </Typography>
              </div>
              <div className="d-flex flex-row justify-content-start align-items-center gap-1 mt-1">
                <AccessTimeRoundedIcon
                  fontSize="inherit"
                  style={{ color: "#929292" }}
                />
                <Typography variant="body2" style={{ color: "#929292" }}>
                  {eventDate.getHours()}:{eventDate.getMinutes()}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          {request.eventRequestStatusId === 1 ? (
            <Typography variant="body2" style={{ color: "#929292" }}>
              Confirmed
            </Typography>
          ) : request.eventRequestStatusId === 2 ? (
            <Typography variant="body2" style={{ color: "#929292" }}>
              Pending
            </Typography>
          ) : (
            <Typography variant="body2" style={{ color: "#929292" }}>
              Rejected
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
}
