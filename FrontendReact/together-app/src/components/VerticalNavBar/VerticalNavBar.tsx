import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import { Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./VerticalNavBar.css";

export function VerticalNavBar(verticalNavFlex: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (route: string) => {
    navigate(route);
    setActiveRoute(route);
  };

  {
    /*
  useEffect(() => {
    if (verticalNavFlex.verticalNavFlex === 0.1) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [verticalNavFlex]);
  */
  }

  return (
    <div className="d-flex flex-column gap-2">
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${
          activeRoute === "/" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/")}
      >
        <HomeRoundedIcon style={{ color: "#474D4B" }} />
        {open && (
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight={"bold"}
            style={{ color: "#474D4B" }}
          >
            Home
          </Typography>
        )}
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${
          activeRoute === "/events" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/events")}
      >
        <AutoModeRoundedIcon style={{ color: "#474D4B" }} />
        {open && (
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight={"bold"}
            style={{ color: "#474D4B" }}
          >
            Events
          </Typography>
        )}
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${
          activeRoute === "/favorite-events" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/favorite-events")}
      >
        <FavoriteIcon
          style={{
            color: activeRoute === "/favorite-events" ? "#FA4A4C" : "#474D4B",
            filter:
              activeRoute === "/favorite-events"
                ? "drop-shadow(0 4px 8px rgba(250, 74, 76, 0.6))"
                : "none",
          }}
        />
        {open && (
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight={"bold"}
            style={{ color: "#474D4B" }}
          >
            Favorite events
          </Typography>
        )}
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${
          activeRoute === "/inbox" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/inbox")}
      >
        <InboxIcon style={{ color: "#474D4B" }} />
        {open && (
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight={"bold"}
            style={{ color: "#474D4B" }}
          >
            Inbox
          </Typography>
        )}
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${
          activeRoute === "/my-profile" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/my-profile")}
      >
        <AccountCircleRoundedIcon style={{ color: "#474D4B" }} />
        {open && (
          <Typography
            variant="subtitle1"
            component="div"
            fontWeight={"bold"}
            style={{ color: "#474D4B" }}
          >
            Profile
          </Typography>
        )}
      </div>
    </div>
  );
}
