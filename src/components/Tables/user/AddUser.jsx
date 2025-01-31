import { useState } from 'react';
import { TextField, Button, Snackbar, CircularProgress, Box, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import axios from 'axios';

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.email || !userData.password || !userData.phoneNumber || !userData.address) {
      setError('All fields are required');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/apiAdmin/v1/user/addUser', userData);

      if (response.status === 200) {
        setSuccess(true);
        setOpenSnackbar(true);
        setUserData({
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: '',
          role: 'user',
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 1000, 
        margin: 'auto', 
        padding: 5, 
        boxShadow: 6, 
        marginTop: 15, 
        marginBottom: 15, 
        backgroundColor: 'background.paper',
        borderRadius: 2,
        '&:hover': {
          boxShadow: 10,
        },
      }}
    >
      <h2 style={{ paddingBottom: '25px', display: 'flex', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#3f51b5' }}>
        Create New User
      </h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          value={userData.username}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={userData.email}
          onChange={handleInputChange}
          type="email"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          value={userData.password}
          onChange={handleInputChange}
          type="password"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          fullWidth
          value={userData.phoneNumber}
          onChange={handleInputChange}
          type="tel"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          fullWidth
          value={userData.address}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="moderator">Moderator</MenuItem>
          </Select>
          <FormHelperText>Select the role of the user</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            marginBottom: 2,
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create User'}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={error || (success ? 'User created successfully' : '')}
        severity={error ? 'error' : 'success'}
      />
    </Box>
  );
};

export default AddUser;
