import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import NotificationProvider from '../src/providers/NotificationProvider';
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3D52F3",
      contrastText: "#fafdff",
    },
    secondary: {
      light: "#ff7961",
      main: "#ffffff",
      dark: "#F57F18",
      contrastText: "#000",
    },
  },
});

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  if (!userId) {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NotificationProvider userId={userId}>
          <Routes />
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
