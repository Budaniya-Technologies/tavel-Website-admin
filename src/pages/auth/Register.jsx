import { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Form validation function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5001/apiAdmin/v1/user/addUser",
          formData
        );
        if (response.data.success) {
          toast.success("Signup successful");
          navigate("/login");
        } else {
          toast.error(response.data.message || "Signup failed");
        }
      } catch (error) {
        toast.error("Signup failed. Please try again later.");
      }
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side: Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage:
            "url(https://cdni.iconscout.com/illustration/premium/thumb/log-in-illustration-download-svg-png-gif-file-formats--login-form-user-social-media-register-sign-up-app-registration-or-pack-interface-illustrations-3723263.png?f=webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Right Side: Signup Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #ffffff, #f8f9fa)",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "50px",
            maxWidth: "420px",
            textAlign: "center",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)",
            position: "relative",
          }}
        >
          {/* Company Logo */}
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/log-in-illustration-download-svg-png-gif-file-formats--login-form-user-social-media-register-sign-up-app-registration-or-pack-interface-illustrations-3723263.png?f=webp"
            alt="Company Logo"
            style={{
              width: "100px",
              position: "absolute",
              top: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              border: "5px solid white",
              backgroundColor: "white",
              boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
            }}
          />

          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#333", mt: 6, mb: 3 }}
          >
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                padding: "12px",
                borderRadius: "25px",
                background: "linear-gradient(to right, #1976D2, #0044ff)",
                color: "#fff",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(to right, #0044ff, #1976D2)",
                },
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" sx={{ color: "#555", mt: 2 }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#1976D2",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
