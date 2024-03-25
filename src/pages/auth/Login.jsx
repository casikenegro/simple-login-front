import { Typography, Box, TextField, Grid, Button } from "@mui/material";
import { Container } from "./components/container";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

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

      console.log(values);

      return errors;
    },
    onSubmit: async (values) => {
      let res = await fetch(
        "https://simple-login-e546.onrender.com/api/v1/auth/login",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (res.status === 201) {
        res = await res.json();
        window.localStorage.setItem("tokenInterview", res.token);
        window.localStorage.setItem("idInterview", res.id);
        navigate("/home");
      }
    },
  });
  const navigate = useNavigate();
  return (
    <Container>
      <Typography variant="h4" textAlign={"center"}>
        Login
      </Typography>
      <Typography fontSize={12} textAlign={"center"} mt={1.5}>
        YOU DO NOT HAVE AN ACCOUNT?{" "}
        <Box
          display={"inline"}
          onClick={() => navigate("/sing-up")}
          sx={{
            cursor: "pointer",
            color: (theme) => theme.palette.primary.main,
            fontWeight: "800",
          }}
        >
          SING UP
        </Box>
      </Typography>
      <Box component={"form"} mb={3} mt={3}>
        <Grid container spacing={1.5}>
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

          <Grid item xs={12}>
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
        </Grid>
      </Box>

      <Button variant="contained" fullWidth onClick={formik.handleSubmit}>
        Log in
      </Button>
    </Container>
  );
};
