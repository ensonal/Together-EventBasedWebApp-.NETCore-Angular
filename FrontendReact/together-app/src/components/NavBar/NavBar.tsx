import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Authenticate from "./Authenticate";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { DefaultNav } from "./DefaultNav";
import newLogo from "../../assets/images/newLogo.png";

export const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticate, setIsAuthenticate, user } = Authenticate();

  return (
    <AppBar
      position="static"
      style={{
        paddingLeft: "20rem",
        paddingRight: "20rem",
        backgroundColor: "#F1F2F6",
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
            style={{ marginRight: "0.5rem", fontFamily: "cursive"}}
            onClick={() => {
              navigate("/");
            }}
            width={50}
            height={50}
            color="primary"
          />
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, color: "#3D52F3", fontWeight: "bolder"}}
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
