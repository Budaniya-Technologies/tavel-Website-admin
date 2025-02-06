import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Paper, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { apiPost } from '../../../utils/http';

const AddPackageAPI = 'apiAdmin/v1/package/addPackage';

const AddPackage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [pickUpPoint, setPickUpPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  const [image, setImage] = useState('');
  const [pdf, setPdf] = useState('');
  const [slug, setSlug] = useState('');
  const [slugContent, setSlugContent] = useState(''); // Rich Content
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const packageData = {
      title,
      description,
      price,
      duration,
      pickUpPoint,
      dropPoint,
      image,
      pdf,
      slug,
      slugContent,
    };

    try {
      const response = await apiPost(AddPackageAPI, packageData);
      console.log('API Response:', response.data);
      toast.success('Package created successfully!', { position: 'top-right', autoClose: 3000 });

      setTimeout(() => {
        navigate('/packages/view-all');
      }, 3000);
    } catch (err) {
      console.error('API Error:', err);
      toast.error('Failed to create package. Please try again.', { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setDuration('');
    setPickUpPoint('');
    setDropPoint('');
    setImage('');
    setPdf('');
    setSlug('');
    setSlugContent('');
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        marginTop: '60px',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ textAlign: 'center', color: 'rgb(63, 81, 181)', fontWeight: 'bold', fontSize: '2rem' }}>Create Package</h2>

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                variant="outlined"
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pick Up Point"
                variant="outlined"
                fullWidth
                value={pickUpPoint}
                onChange={(e) => setPickUpPoint(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Drop Point"
                variant="outlined"
                fullWidth
                value={dropPoint}
                onChange={(e) => setDropPoint(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={image}
                onChange={(e) => setImage(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="PDF URL"
                variant="outlined"
                fullWidth
                value={pdf}
                onChange={(e) => setPdf(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Slug"
                variant="outlined"
                fullWidth
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Slug Content</label>
              <ReactQuill
                theme="snow"
                value={slugContent}
                onChange={setSlugContent}
                style={{ height: '150px', marginBottom: '20px' }}
              />
            </Grid>
          </Grid>

          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default AddPackage;
