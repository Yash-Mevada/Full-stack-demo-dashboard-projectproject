// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiCall } from "../utills/ApiServices.js";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spline from "@splinetool/react-spline";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await apiCall("/auth/login", "POST", values);
        toast.success("Login successful!"); // Show success toast
        navigate("/dashboard");
      } catch (err) {
        setError("Invalid credentials, Please try again.");
        toast.error("Invalid credentials, Please try again."); // Show error toast
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
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
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
            <Button color="primary" variant="contained" fullWidth type="submit">
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center">
              Don’t have an account?{" "}
              <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
                Sign Up
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

export default Login;
