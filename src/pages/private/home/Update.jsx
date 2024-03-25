import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../auth/components/container";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      username: "",
      role: "user",
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
      if (!id) {
        if (values.password.length < 8) {
          errors.password = "The password requires at least 8 characters";
        }
        if (values.confirmPassword.length < 8) {
          errors.confirmPassword =
            "The password requires at least 8 characters";
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "The confirmation password is incorrect";
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      let token = window.localStorage.getItem("tokenInterview");
      const data = { ...values };
      delete data.confirmPassword;

      console.log("sending");
      if (!id) {
        const res = await axios.post(
          "https://simple-login-e546.onrender.com/api/v1/users",
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        if (res.status === 201) {
          toast.success("Successfully created users", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/home");
        } else {
          toast.error("Unexpected error", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        if (!data.password.length) {
          delete data.password;
        }
        const res = await axios.patch(
          "https://simple-login-e546.onrender.com/api/v1/users/" + id,
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          toast.success("Users edited successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/home");
        } else {
          toast.error("Unexpected error", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    },
  });

  useEffect(() => {
    if (id) {
      const init = async () => {
        let token = window.localStorage.getItem("tokenInterview");

        let res = await fetch(
          "https://simple-login-e546.onrender.com/api/v1/users/" + id,
          {
            method: "get",
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          res = await res.json();
          delete res.deletedAt;
          delete res.id;
          res.password = "";
          res.confirmPassword = "";
          console.log(res);
          formik.setValues({ ...res });
        }
      };
      init();
    }
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <Container>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h4" textAlign={"center"}>
          {id ? "Edit user" : "Create user"}
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
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={
                  formik.touched.name &&
                  formik.errors.name &&
                  formik.errors.name
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
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.lastname && formik.errors.lastname
                )}
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
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                helperText={
                  formik.touched.username &&
                  formik.errors.username &&
                  formik.errors.username
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.role}
                  label="role"
                  onChange={(e, o) => {
                    console.log(e, o);
                  }}
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formik.values.email}
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
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
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
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
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
          {id ? "Save" : "Create"}
        </Button>
      </Container>
    </Box>
  );
};
