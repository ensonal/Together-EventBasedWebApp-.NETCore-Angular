import LoginForm from "../../routes/Login/LoginForm";
import { LoginValues } from "../models/LoginValues";
import RegisterForm from "../../routes/Register/RegisterForm";
import { RegisterValues } from "../models/RegisterValues";
import { useNavigate } from "react-router-dom";
import { post } from "../axios";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";


export function Login() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function handleLoginSubmit(values: LoginValues) {
    try {
      const data = await post("/User/login", values);
      
      if (data.succeeded) {
        localStorage.setItem("jwToken", data.user.jwToken);
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("userRole", data.user.roles[0]);
        
        navigate("/events");
      } else {
        setSnackbarMessage(data.error);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Invalid email or password. Please try again.");
      setSnackbarOpen(true);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <LoginForm onSubmit={handleLoginSubmit} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}


export function Register() {
  const navigate = useNavigate();

  async function handleRegisterSubmit(values: RegisterValues) {
    const response = await post("/User/register", {
      email: values.Email,
      username: values.Username,
      password: values.Password,
      name: values.Name,
      surname: values.Surname,
      phoneNumber: values.PhoneNumber,
      country: values.Country,
      city: values.City,
      birthday: new Date(),
    });

    if (response.succeeded) {
      navigate("/login");
    }
  }

  return <RegisterForm onSubmit={handleRegisterSubmit} />;
}
