import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InboxIcon from "@mui/icons-material/Inbox";
import { Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import AutoModeRoundedIcon from '@mui/icons-material/AutoModeRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './VerticalNavBar.css'; // CSS dosyasını import ediyoruz

export function VerticalNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (route: string) => {
    navigate(route);
    setActiveRoute(route);
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${activeRoute === '/' ? 'active' : ''}`}
        onClick={() => handleNavigation('/')}
      >
        <HomeRoundedIcon />
        <Typography variant="subtitle1" component="div" fontWeight={"bold"}>
          Home
        </Typography>
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${activeRoute === '/notifications' ? 'active' : ''}`}
        onClick={() => handleNavigation('/notifications')}
      >
        <NotificationsNoneRoundedIcon />
        <Typography variant="subtitle1" component="div" fontWeight={"bold"}>
          Notifications
        </Typography>
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${activeRoute === '/events' ? 'active' : ''}`}
        onClick={() => handleNavigation('/events')}
      >
        <AutoModeRoundedIcon />
        <Typography variant="subtitle1" component="div" fontWeight={"bold"}>
          Events
        </Typography>
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${activeRoute === '/inbox' ? 'active' : ''}`}
        onClick={() => handleNavigation('/inbox')}
      >
        <InboxIcon />
        <Typography variant="subtitle1" component="div" fontWeight={"bold"}>
          Inbox
        </Typography>
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${activeRoute === '/bookmarks' ? 'active' : ''}`}
        onClick={() => handleNavigation('/bookmarks')}
      >
        <BookmarkBorderRoundedIcon />
        <Typography variant="subtitle1" component="div" fontWeight={"bold"}>
          Bookmarks
        </Typography>
      </div>
      <div
        className={`d-flex flex-row justify-content-start align-items-center gap-2 nav-item rounded-3 p-2 ${activeRoute === '/my-profile' ? 'active' : ''}`}
        onClick={() => handleNavigation('/my-profile')}
      >
        <AccountCircleRoundedIcon />
        <Typography variant="subtitle1" component="div" fontWeight={"bold"}>
          Profile
        </Typography>
      </div>
    </div>
  );
}
