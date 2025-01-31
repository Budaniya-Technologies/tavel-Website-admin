import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  CircularProgress,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const AddPackage = () => {
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [chargeRanges, setChargeRanges] = useState([
    { lowerLimit: '', upperLimit: '', chargeType: '', charge: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddChargeRange = () => {
    setChargeRanges([
      ...chargeRanges,
      { lowerLimit: '', upperLimit: '', chargeType: '', charge: '' },
    ]);
  };

  const handleRemoveChargeRange = (index) => {
    const newChargeRanges = chargeRanges.filter((_, i) => i !== index);
    setChargeRanges(newChargeRanges);
  };

  const handleChargeRangeChange = (e, index) => {
    const { name, value } = e.target;
    const newChargeRanges = [...chargeRanges];
    newChargeRanges[index][name] = value;
    setChargeRanges(newChargeRanges);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newPackage = {
        packageName,
        description,
        status,
        chargeRanges,
      };

      console.log('Package Created:', newPackage);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to create package. Please try again.');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    setPackageName('');
    setDescription('');
    setStatus('');
    setChargeRanges([{ lowerLimit: '', upperLimit: '', chargeType: '', charge: '' }]);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        marginTop: '100px',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ paddingBottom: '20px', textAlign: 'center', fontSize: '2rem' }}>Create Package</h2>

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Package Name"
            variant="outlined"
            fullWidth
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />

          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <h3>Charge Ranges</h3>

          {chargeRanges.map((chargeRange, index) => (
            <Box key={index} sx={{ marginBottom: '15px' }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    label="Lower Limit"
                    variant="outlined"
                    fullWidth
                    name="lowerLimit"
                    value={chargeRange.lowerLimit}
                    onChange={(e) => handleChargeRangeChange(e, index)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Upper Limit"
                    variant="outlined"
                    fullWidth
                    name="upperLimit"
                    value={chargeRange.upperLimit}
                    onChange={(e) => handleChargeRangeChange(e, index)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Charge Type"
                    variant="outlined"
                    fullWidth
                    name="chargeType"
                    value={chargeRange.chargeType}
                    onChange={(e) => handleChargeRangeChange(e, index)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Charge"
                    variant="outlined"
                    fullWidth
                    name="charge"
                    value={chargeRange.charge}
                    onChange={(e) => handleChargeRangeChange(e, index)}
                  />
                </Grid>
                <Grid item xs={1}>
                  {chargeRanges.length > 1 && (
                    <IconButton onClick={() => handleRemoveChargeRange(index)} color="error">
                      <RemoveCircleOutline />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}

          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddChargeRange}
            sx={{ marginBottom: '20px' }}
          >
            Add Charge Range
          </Button>

          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          )}
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={error || (success ? 'Package created successfully!' : '')}
        severity={error ? 'error' : 'success'}
      />
    </Box>
  );
};

export default AddPackage;
