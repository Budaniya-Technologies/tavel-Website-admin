import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Paper, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiPost } from '../../../utils/http';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlogAPI = 'apiAdmin/v1/blog/addBlog';

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [slugContent, setSlugContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      title,
      description,
      image,
      slug,
      slugContent, // Now contains rich text content
      category,
    };

    try {
      const response = await apiPost(AddBlogAPI, blogData);
      console.log('API Response:', response.data);
      toast.success('Blog created successfully!', { position: 'top-right', autoClose: 3000 });
      setTimeout(() => {
        navigate('/blogs/view-all');
      }, 3000);
    } catch (err) {
      console.error('API Error:', err);
      toast.error('Failed to create blog. Please try again.', { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setSlug('');
    setSlugContent('');
    setCategory('');
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, boxShadow: 3, marginTop: '60px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: 'rgb(63, 81, 181)', fontWeight: 'bold', fontSize: '2rem' }}>Create Blog</h2>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" variant="outlined" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Image URL" variant="outlined" fullWidth value={image} onChange={(e) => setImage(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Slug" variant="outlined" fullWidth value={slug} onChange={(e) => setSlug(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333', marginBottom: '5px' }}>Slug Content</label>
              <ReactQuill theme="snow" value={slugContent} onChange={setSlugContent} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Category" variant="outlined" fullWidth value={category} onChange={(e) => setCategory(e.target.value)} />
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

export default AddBlog;
