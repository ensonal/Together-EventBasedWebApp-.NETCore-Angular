import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Authenticate from "./Authenticate";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { DefaultNav } from "./DefaultNav";
import React from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticate, setIsAuthenticate, user } = Authenticate();

  return (
    <AppBar position="static">
      <Container
        sx={{
          maxWidth: "100% !important",
          paddingLeft: "1vw !important",
          paddingRight: "1vw !important",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Together
          </Typography>
          {isAuthenticate ? <AuthenticatedNav /> : <DefaultNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
