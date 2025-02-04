import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert, CircularProgress, Box, Grid } from '@mui/material';
import { apiPost } from '../../../utils/http';

const AddUsersDetails = 'apiAdmin/v1/user/addUser';

const AddUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    addresh: {
      country: '',
      state: '',
      city: '',
      addresh: '',
      pincode: '',
    },
    isRole: 'Users',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('addresh.')) {
      const addressField = name.split('.')[1];
      setUserData({
        ...userData,
        addresh: { ...userData.addresh, [addressField]: value },
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.fullName || !userData.email || !userData.password || !userData.mobileNumber || !userData.addresh.country || !userData.addresh.state || !userData.addresh.city || !userData.addresh.addresh || !userData.addresh.pincode) {
      setError('All fields are required');
      setSuccess(false);
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await apiPost(AddUsersDetails, userData);

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setOpenSnackbar(true);
        setUserData({
          fullName: '',
          email: '',
          password: '',
          mobileNumber: '',
          addresh: { country: '', state: '', city: '', addresh: '', pincode: '' },
          isRole: 'Users',
        });

        setTimeout(() => {
          navigate('/users/view-all');
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess(false);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 900, 
        margin: 'auto', 
        padding: 4, 
        marginTop: 20,
        boxShadow: 3, 
        borderRadius: 2, 
        backgroundColor: 'background.paper',
      }}
    >
      <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: '#3f51b5', marginBottom: '20px' }}>
        Create New User
      </h2>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" name="fullName" variant="outlined" fullWidth value={userData.fullName} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" variant="outlined" fullWidth value={userData.email} onChange={handleInputChange} type="email" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Password" name="password" variant="outlined" fullWidth value={userData.password} onChange={handleInputChange} type="password" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Mobile Number" name="mobileNumber" variant="outlined" fullWidth value={userData.mobileNumber} onChange={handleInputChange} type="tel" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Country" name="addresh.country" variant="outlined" fullWidth value={userData.addresh.country} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="State" name="addresh.state" variant="outlined" fullWidth value={userData.addresh.state} onChange={handleInputChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="City" name="addresh.city" variant="outlined" fullWidth value={userData.addresh.city} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Pincode" name="addresh.pincode" variant="outlined" fullWidth value={userData.addresh.pincode} onChange={handleInputChange} type="number" />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Address" name="addresh.addresh" variant="outlined" fullWidth value={userData.addresh.addresh} onChange={handleInputChange} />
          </Grid>
        </Grid>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={loading} 
          sx={{ marginTop: 3, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create User'}
        </Button>
      </form>

      {/* Success & Error Toast Notification */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={success ? 'success' : 'error'}>
          {success ? 'User created successfully!' : error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddUser;
