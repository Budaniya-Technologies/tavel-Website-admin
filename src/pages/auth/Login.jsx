import { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiPost } from "../../utils/http"; // Your custom API utility
import imgLogo from "../../assets/Images/thebagPacker-logo.png";

const API_ADMIN_ENDPOINT = 'apiAdmin/v1/user/login'; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
      [name]: '',
    });
  };

  // Form validation function
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await apiPost(API_ADMIN_ENDPOINT, {
          email: formData.email,
          password: formData.password,
        });

        if (response.data.message === "Success") {
          toast.success('Login successful');
          localStorage.setItem('token', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);

          navigate('/'); 
        } else {
          toast.error(response.data.message || 'Invalid credentials');
        }
      } catch (error) {
        toast.error('Failed to login. Please try again later.');
      }
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side: Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(https://chat.digimicra.com/assets/images/login.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Right Side: Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: '50px',
            maxWidth: '420px',
            textAlign: 'center',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative',
          }}
        >
          {/* Company Logo */}
          <img
            src={imgLogo}
            alt="Company Logo"
            style={{
              width: '100px',
              position: 'absolute',
              top: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '50%',
              border: '5px solid white',
              backgroundColor: 'white',
              boxShadow: '0px 5px 20px rgba(0,0,0,0.2)',
            }}
          />

          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', mt: 6, mb: 3 }}>
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
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
              sx={{
                '& label': { color: '#555' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#aaa' },
                  '&:hover fieldset': { borderColor: '#1976D2' },
                  '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                },
              }}
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
              sx={{
                '& label': { color: '#555' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#aaa' },
                  '&:hover fieldset': { borderColor: '#1976D2' },
                  '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                padding: '12px',
                borderRadius: '25px',
                background: 'linear-gradient(to right, #1976D2, #0044ff)',
                color: '#fff',
                fontWeight: 'bold',
                transition: '0.3s',
                '&:hover': { background: 'linear-gradient(to right, #0044ff, #1976D2)' },
              }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" sx={{ color: '#555', mt: 2 }}>
            <a href="/forgot-password" style={{ color: '#1976D2', textDecoration: 'none' }}>
              Forgot Password?
            </a>
          </Typography>

          <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#1976D2', fontWeight: 'bold', textDecoration: 'none' }}>
              Sign Up
            </a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
