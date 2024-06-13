import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { LoginValues } from "../../api/models/LoginValues";
import newLogo from "../../assets/images/newLogo.png";
import { Container } from "@mui/material";

const validationSchema: yup.Schema<LoginValues> = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

interface LoginProps {
  onSubmit: (values: LoginValues) => void;
}

export default function LoginForm(props: LoginProps) {
  const formik = useFormik<LoginValues>({
    validationSchema,
    initialValues: { email: "", password: "" },
    onSubmit: props.onSubmit,
  });

  const navigate = useNavigate();

  if (localStorage.getItem("jwToken") != null) return <Link to="/events"></Link>;

  return (
    <div className="d-flex flex-column">
      <FormikProvider value={formik}>
        <Container component="main" maxWidth="md">
          <form name="login-form" onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                maxWidth: "450px",
                marginLeft: 8,
                gap: 2,
              }}
            >
              <div className="d-flex flex-row align-items-center gap-2">
                <img
                  src={newLogo}
                  alt="logo"
                  style={{ width: "60px", height: "60px" }}
                />
                <Typography variant="h4" style={{ color: "#505050" }}>
                  Together
                </Typography>
              </div>
              <div className="d-flex flex-column justify-content-start gap-0">
                <>
                  <Typography
                    style={{ color: "#505050" }}
                    sx={{ fontSize: 23, fontWeight: "bold" }}
                  >
                    Log in to your account
                  </Typography>
                </>
                <Typography style={{ color: "#707070" }} sx={{ fontSize: 16 }}>
                  Welcome back!
                </Typography>
              </div>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                error={!!(formik.errors.email && formik.touched.email)}
                helperText={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : undefined
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                error={!!(formik.errors.password && formik.touched.password)}
                helperText={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : undefined
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Button
                variant="contained"
                type="submit"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Log in
              </Button>
              <div className="d-flex flex-row justify-content-center m-0 p-0">
              <Typography
                style={{ color: "#909090" }}
                sx={{ fontSize: 15, fontWeight: "bold" }}
              >
                Don't have an account?
              </Typography>
              <Typography
                className="ms-1"
                style={{ color: "#3D52F3", cursor: "pointer" }}
                sx={{ fontSize: 15, fontWeight: "bold" }}
                onClick={() => navigate("/register")}
              >
                Create an account
              </Typography>
            </div>
            </Box>
          </form>
        </Container>
      </FormikProvider>
    </div>
  );
}
