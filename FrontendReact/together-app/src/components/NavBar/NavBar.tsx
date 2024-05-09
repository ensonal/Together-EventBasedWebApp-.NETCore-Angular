import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Authenticate from "./Authenticate";

export const NavBar = () => {
  const pages = ["Home Page", "Share Post"];
  let settings = ["Settings"];

  const navigate = useNavigate();

  const { isAuthenticate, setIsAuthenticate, user } = Authenticate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = (
    event: React.MouseEvent<HTMLElement>,
    setting: string
  ) => {
    setAnchorElUser(event.currentTarget);
    if (setting === "Logout") {
      setIsAuthenticate(false);
      localStorage.clear();
      settings = ["Settings"];

      navigate("../");
    }
    if (setting === "Settings") {
      if (user !== undefined) navigate(`../user/${user.userID}`);
    }
    if (setting === "Dashboard") {
      navigate("../dashboard");
    }
    if (setting === "Post Settings") {
      navigate("../editorPostSettings");
    }
  };

  const handleLogout2 = (
    event: React.MouseEvent<HTMLElement>,
    pages: string
  ) => {
    setAnchorElNav(null);
    if (pages === "Home Page") {
      navigate("../home");
    }
    if (pages === "Share Post") {
      navigate("../sharePost");
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isAuthenticate && !settings.includes("Logout")) {
      settings.push("Logout");

      if (
        localStorage.getItem("userRole") === "Admin" &&
        !settings.includes("Dashboard")
      ) {
        settings.push("Dashboard");
      }
      if (
        localStorage.getItem("userRole") === "Editor" &&
        !settings.includes("Post Settings")
      ) {
        settings.push("Post Settings");
      }
    }
  }, [isAuthenticate]);

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl" color="AppBar">
          <Toolbar disableGutters>
            <EmojiNatureIcon
              sx={{
                display: {
                  xs: "none",
                  md: "initial",
                  fontSize: "55px",
                  color: "#D8DCD6",
                },
                mr: 2,
              }}
            />
            {isAuthenticate && (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={(event) => handleLogout2(event, page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, my: 2, color: "white" }}
                    >
                      <MenuIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          onClick={(event) => handleLogout(event, setting)}
                          textAlign="center"
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            )}

            {!isAuthenticate && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  vertical: "top",
                  horizontal: "right",
                  justifyContent: "right",
                }}
              >
                <Button
                  sx={{
                    border: "2px solid",
                    color: "#D8DCD6",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    navigate("../register");
                  }}
                >
                  Sign Up
                </Button>

                <Button
                  sx={{ border: "2px solid", color: "#D8DCD6" }}
                  onClick={() => {
                    navigate("../login");
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
