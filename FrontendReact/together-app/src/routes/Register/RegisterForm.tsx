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

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardContent>
        <FormikProvider value={formik}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" color="primary">
                Register
              </Typography>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3, width: "100%" }}
              >
                <Stack spacing={2}>
                  <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    variant="outlined"
                    error={
                      !!(formik.errors.Username && formik.touched.Username)
                    }
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
                      error={
                        !!(formik.errors.Surname && formik.touched.Surname)
                      }
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
                      error={
                        !!(formik.errors.Country && formik.touched.Country)
                      }
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
                      required
                      fullWidth
                      id="PhoneNumber"
                      label="Phone Number"
                      variant="outlined"
                      error={
                        !!(
                          formik.errors.PhoneNumber &&
                          formik.touched.PhoneNumber
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
                    error={
                      !!(formik.errors.Password && formik.touched.Password)
                    }
                    helperText={
                      formik.errors.Password && formik.touched.Password
                        ? formik.errors.Password
                        : undefined
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Password}
                  />
                  <Link href="../login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Container>
        </FormikProvider>
      </CardContent>
      <CardActions className="d-flex justify-content-center">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="primary"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Sign Up
        </Button>
      </CardActions>
    </Card>
  );
}
