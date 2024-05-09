import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { LoginValues } from "../../api/models/LoginValues";
import { Card, CardContent } from "@mui/material";

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

  if (localStorage.getItem("jwToken") != null) return <Link to="/"></Link>;

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardContent>
        <FormikProvider value={formik}>
          <form name="login-form" onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                maxWidth: 400,
                mx: "auto",
                my: 4,
                py: 3,
                px: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
            >
              <div>
                <Typography variant="h4" component="h1">
                  <b>Welcome!</b>
                </Typography>
                <Typography>Sign in to continue</Typography>
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
                LOGIN
              </Button>
            </Box>
          </form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
}
