import { Button, Card, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ShareLocationRoundedIcon from "@mui/icons-material/ShareLocationRounded";
import { splitDateToMonthName } from "../../../../api/models/UserEvent";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  acceptRequestToJoinEvent,
  rejectRequestToJoinEvent,
} from "../../../../api/services/RequestManagementService";

export function IncEventRequestCard({ request }: { request: any }) {
  const navigate = useNavigate();

  const eventDate = new Date(request.eventView.eventDate);
  const { month } = splitDateToMonthName(eventDate);

  const handleUserViewClick = () => {
    navigate(`/user/${request.guestUserId}`);
  };

  const handleAccept = () => {
    acceptRequestToJoinEvent(request.userEventRequestId).then(() => {
      window.location.reload();
    });
  };

  const handleReject = () => {
    rejectRequestToJoinEvent(request.userEventRequestId).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="d-flex flex-row gap-2 w-100">
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
        </div>
      </Card>
      <Card
        sx={{ boxShadow: 0, flex: 1.5 }}
        className="d-flex flex-column w-100 align-self-start rounded-4 p-3 gap-2 shadow-sm h-100 w-100"
      >
        <div
          className="d-flex flex-row gap-3 h-100"
          style={{ cursor: "pointer" }}
          onClick={() => handleUserViewClick()}
        >
          <img
            src={request?.userInfoView.profileImageUrl ? request?.userInfoView.profileImageUrl : "https://togetherwebapp.blob.core.windows.net/userprofileimages/people.png"}
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
                {request?.userInfoView.name} {request?.userInfoView.surname}
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
                {request?.userInfoView.city} - {request?.userInfoView.country}
              </Typography>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row w-100 gap-1 mt-1 justify-content-center align-self-end h-100">
          <Button
            variant="contained"
            startIcon={<CheckCircleRoundedIcon />}
            size="small"
            color="success"
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelRoundedIcon />}
            size="small"
            color="error"
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      </Card>
    </div>
  );
}
