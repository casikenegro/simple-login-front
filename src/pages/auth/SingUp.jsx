import { Typography, Box, TextField, Grid, Button } from "@mui/material";
import { Container } from "./components/container";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export const SingUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name.length) {
        errors.name = "The first name is required";
      }
      if (!values.lastname.length) {
        errors.lastname = "The last name is required";
      }
      if (!values.username.length) {
        errors.username = "The user name is required";
      }
      if (!values.email.length) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())
      ) {
        errors.email = "The format is invalid";
      }
      if (values.password.length < 8) {
        errors.password = "The password requires at least 8 characters";
      }
      if (values.confirmPassword.length < 8) {
        errors.confirmPassword = "The password requires at least 8 characters";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "The confirmation password is incorrect";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log("sending");
      console.log(values);
      const data = { ...values };
      delete data.confirmPassword;
      data.role = "user";
      const res = await fetch(
        "https://simple-login-e546.onrender.com/api/v1/auth/register",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.status === 201) {
        navigate("/");
      }
    },
  });

  return (
    <Container>
      <Typography variant="h4" textAlign={"center"}>
        Sing up
      </Typography>
      <Typography fontSize={12} textAlign={"center"} mt={1.5}>
        ALREADY HAVE AN ACCOUNT?{" "}
        <Box
          display={"inline"}
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.primary.main,
            fontWeight: "800",
          }}
        >
          LOG IN
        </Box>
      </Typography>
      <Box component={"form"} mb={3} mt={3}>
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Fist name"
              variant="outlined"
              fullWidth
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              fullWidth
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.lastname && formik.errors.lastname)}
              helperText={
                formik.touched.lastname &&
                formik.errors.lastname &&
                formik.errors.lastname
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="User name"
              variant="outlined"
              fullWidth
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.username && formik.errors.username)}
              helperText={
                formik.touched.username &&
                formik.errors.username &&
                formik.errors.username
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                formik.errors.email
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                formik.errors.password
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              helperText={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                formik.errors.confirmPassword
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Button variant="contained" fullWidth onClick={formik.handleSubmit}>
        Sing up
      </Button>
    </Container>
  );
};
