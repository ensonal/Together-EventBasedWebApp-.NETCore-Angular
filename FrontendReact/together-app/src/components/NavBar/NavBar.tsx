import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Authenticate from "./Authenticate";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { DefaultNav } from "./DefaultNav";
import newLogo from "../../assets/images/newLogo.png";
import { useEffect, useState } from "react";
import { getPadding } from "../../utils/getPaddingByScreenSize";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticate, user } = Authenticate();
  const [padding, setPadding] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      setPadding(getPadding(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        paddingLeft: `${padding}rem`,
        paddingRight: `${padding}rem`,
        backgroundColor: "#F1F2F6",
        paddingTop: "0.5rem",
      }}
    >
      <Container
        sx={{
          maxWidth: "100% !important",
          padding: "0 !important",
        }}
      >
        <Toolbar disableGutters>
          <img
            src={newLogo}
            alt="logo"
            style={{ marginRight: "0.5rem", fontFamily: "cursive", cursor: "pointer"}}
            onClick={() => {
              navigate("/events");
            }}
            width={50}
            height={50}
            color="primary"
          />
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, color: "#3D52F3", fontWeight: "bolder" }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/events");
            }}
          >
            Together
          </Typography>
          {isAuthenticate && user ? (
            <AuthenticatedNav user={user} />
          ) : (
            <DefaultNav />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
