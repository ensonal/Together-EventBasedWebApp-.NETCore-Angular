import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl" color="AppBar">
          <Toolbar disableGutters>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Together
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};