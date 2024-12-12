import React from "react";
import { apiCall } from "../utills/ApiServices.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await apiCall("/auth/register", "POST", { username, password });
        toast.success("Registration successful. You can now log in.");
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Try again.");
      }
    },
  });

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: 400, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              margin="normal"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Register
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
          <ToastContainer />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Spline scene="https://prod.spline.design/7USGg6ZMCYe5mzUT/scene.splinecode" />
      </Grid>
    </Grid>
  );
};

export default Register;
