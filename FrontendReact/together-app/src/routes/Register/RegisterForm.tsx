import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardActions, CardContent, Stack } from "@mui/material";
import { RegisterValues } from "../../api/models/RegisterValues";
import newLogo from "../../assets/images/newLogo.png";
import { useNavigate } from "react-router-dom";

const validationSchema: yup.Schema<RegisterValues> = yup.object({
  Email: yup.string().email().required(),
  Name: yup.string().required(),
  Surname: yup.string().required(),
  Username: yup.string().required(),
  Password: yup.string().required().min(8),
  PhoneNumber: yup
    .string()
    .required()
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
      "Phone number is not valid"
    ),
  Country: yup.string().required(),
  City: yup.string().required(),
  Birthday: yup.date().required(),
});

interface RegisterProps {
  onSubmit: (values: RegisterValues) => void;
}

export default function RegisterForm(props: RegisterProps) {
  const formik = useFormik<RegisterValues>({
    validationSchema,
    initialValues: {
      Email: "",
      Password: "",
      Username: "",
      PhoneNumber: "",
      Name: "",
      Surname: "",
      Country: "",
      City: "",
      Birthday: new Date(),
    },
    onSubmit: props.onSubmit,
  });

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column">
      <FormikProvider value={formik}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
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
                <Typography style={{ color: "#909090" }} sx={{ fontSize: 14 }}>
                  Start for free*
                </Typography>
                <Typography
                  style={{ color: "#505050" }}
                  sx={{ fontSize: 23, fontWeight: "bold" }}
                >
                  Create new account
                </Typography>
              </>
              <Typography
                style={{ color: "#707070" }}
                sx={{ fontSize: 16 }}
              >
                To join the Together community, please fill in the form below.
              </Typography>
            </div>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <Stack spacing={2}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  variant="outlined"
                  error={!!(formik.errors.Username && formik.touched.Username)}
                  helperText={
                    formik.errors.Username && formik.touched.Username
                      ? formik.errors.Username
                      : undefined
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Username}
                />
                <Stack spacing={2} direction={"row"}>
                  <TextField
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    variant="outlined"
                    error={!!(formik.errors.Name && formik.touched.Name)}
                    helperText={
                      formik.errors.Name && formik.touched.Name
                        ? formik.errors.Name
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Name}
                  />
                  <TextField
                    required
                    fullWidth
                    id="Surname"
                    label="Surname"
                    variant="outlined"
                    error={!!(formik.errors.Surname && formik.touched.Surname)}
                    helperText={
                      formik.errors.Surname && formik.touched.Surname
                        ? formik.errors.Surname
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Surname}
                  />
                </Stack>
                <Stack spacing={2} direction={"row"}>
                  <TextField
                    required
                    fullWidth
                    id="Country"
                    label="Country"
                    variant="outlined"
                    error={!!(formik.errors.Country && formik.touched.Country)}
                    helperText={
                      formik.errors.Country && formik.touched.Country
                        ? formik.errors.Country
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Country}
                  />
                  <TextField
                    required
                    fullWidth
                    id="City"
                    label="City"
                    variant="outlined"
                    error={!!(formik.errors.City && formik.touched.City)}
                    helperText={
                      formik.errors.City && formik.touched.City
                        ? formik.errors.City
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.City}
                  />
                </Stack>
                <Stack spacing={2} direction={"row"}>
                  <TextField
                    required
                    fullWidth
                    id="Email"
                    label="Email"
                    variant="outlined"
                    error={!!(formik.errors.Email && formik.touched.Email)}
                    helperText={
                      formik.errors.Email && formik.touched.Email
                        ? formik.errors.Email
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Email}
                  />
                  <TextField
                  className="rounded-4"
                    required
                    fullWidth
                    id="PhoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    error={
                      !!(
                        formik.errors.PhoneNumber && formik.touched.PhoneNumber
                      )
                    }
                    helperText={
                      formik.errors.PhoneNumber && formik.touched.PhoneNumber
                        ? formik.errors.PhoneNumber
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.PhoneNumber}
                  />
                </Stack>
                <TextField
                  required
                  fullWidth
                  id="Password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={!!(formik.errors.Password && formik.touched.Password)}
                  helperText={
                    formik.errors.Password && formik.touched.Password
                      ? formik.errors.Password
                      : undefined
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Password}
                />
              </Stack>
            </Box>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mt: 1, mb: 1, width: "100%", alignSelf: "center" }}
              color="primary"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Sign Up
            </Button>
            <div className="d-flex flex-row justify-content-center m-0 p-0">
              <Typography
                style={{ color: "#909090" }}
                sx={{ fontSize: 15, fontWeight: "bold" }}
              >
                Already have an account?
              </Typography>
              <Typography
                className="ms-1"
                style={{ color: "#3D52F3", cursor: "pointer" }}
                sx={{ fontSize: 15, fontWeight: "bold" }}
                onClick={() => navigate("/login")}
              >
                Log in
              </Typography>
            </div>
          </Box>
        </Container>
      </FormikProvider>
    </div>
  );
}
