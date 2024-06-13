import { Box, Button, Typography } from "@mui/material";
import "./LandingPage.css";
import landingImage from "../../assets/images/containerimages/landingImage.jpg";

export function LandingPage() {
  return (
    <Box
      className="landing"
      display="flex"
      flexDirection="row"
      width="100%"
      height="100vh"
      sx={{ position: "relative" }}
    >
      <Box
        className="info rounded-3"
        display="flex"
        flexDirection="column"
        gap={3}
        justifyContent="center"
        zIndex={2}
        sx={{ position: "relative" }}
        flex={0.5}
      >
        <Typography variant="h3" fontWeight={"bold"} color={"white"}>
          Socialize with Sports Activities!
        </Typography>
        <Typography variant="body1" fontWeight={"normal"} color={"white"}>
          We make it easy and fun to start sport. Create your events, set your
          schedule, and start your sport journey!
        </Typography>
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row justify-content-start">
            <Button
              variant="contained"
              size="large"
              fullWidth={false}
              onClick={() => (window.location.href = "/register")}
            >
              Get Started
            </Button>
          </div>
          <div className="d-flex flex-row justify-content-start m-0 p-0">
              <Typography
                style={{ color: "white" }}
                sx={{ fontSize: 15, fontWeight: "" }}
              >
                Already have an account?
              </Typography>
              <Typography
                className="ms-1"
                style={{ color: "white", cursor: "pointer" }}
                sx={{ fontSize: 15, fontWeight: "bold" }}
                onClick={() => window.location.href = "/login"}
              >
                Log in
              </Typography>
            </div>
        </div>
      </Box>
      <Box
        className="background-image rounded-3"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundImage: `url(${landingImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)", // optional: to darken the background image for better text visibility
        }}
      />
    </Box>
  );
}
