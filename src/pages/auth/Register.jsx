import { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiPost } from "../../utils/http";

const ApiRegister = "apiSuper/v1/user/register";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secureKey: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.secureKey.trim()) newErrors.secureKey = "Secure Key is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        websiteLinked: "6791ddd50785d8a01dadae3b",
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        secureKey: formData.secureKey,
      };

      try {
        const response = await apiPost(ApiRegister, payload);
        if (response.data.statusCode === 201) {
          toast.success("User Created Successfully!");
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
        <Paper elevation={6} sx={{ padding: "50px", maxWidth: "420px", textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mt: 2, mb: 3 }}>
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
              label="Secure Key"
              name="secureKey"
              value={formData.secureKey}
              onChange={handleChange}
              error={!!errors.secureKey}
              helperText={errors.secureKey}
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
              }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
