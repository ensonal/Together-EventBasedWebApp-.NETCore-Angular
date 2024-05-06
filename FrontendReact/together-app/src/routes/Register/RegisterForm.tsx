import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export interface RegisterValues {
  Username: string;
  Email: string;
  Password: string;
}
/**
 *  confirmPassword: yup
    .string()
    .required()
    .oneOf([ref('password')], 'Passwords do not match')
 */
const validationSchema: yup.Schema<RegisterValues> = yup.object({
  Email: yup.string().email().required(),
  Username: yup.string().required(),
  Password: yup.string().required().min(8),
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
    },
    onSubmit: props.onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Username}
                />
              </Grid>

              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormikProvider>
  );
}
