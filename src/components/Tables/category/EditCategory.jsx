import { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Typography, CircularProgress, IconButton, Paper
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiGet, apiPatch } from '../../../utils/http';
import { toast } from 'react-toastify';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    subcategories: [{ name: '', image: '' }]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await apiGet(`/apiAdmin/v1/category/${id}`);
      console.log(response)
      const category = response?.data || {};

      setFormData({
        name: category.categoryName || '', // ✅ Use 'name'
        icon: category.icon || '',
        subcategories: category.subcategories && category.subcategories.length > 0
          ? category.subcategories.map(sub => ({
              name: sub.name,
              image: sub.image
            }))
          : [{ name: '', image: '' }]
      });
    } catch (error) {
      toast.error('Failed to load category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubcategoryChange = (index, value, field) => {
    const updatedSubcategories = [...formData.subcategories];
    updatedSubcategories[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      subcategories: updatedSubcategories
    }));
  };

  const handleImageUrlChange = (index, event) => {
    const updated = [...formData.subcategories];
    updated[index].image = event.target.value;
    setFormData(prev => ({ ...prev, subcategories: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('icon', formData.icon);
    console.log(payload)

    formData.subcategories.forEach((sub, index) => {
      payload.append(`subcategories[${index}][name]`, sub.name);
      payload.append(`subcategories[${index}][image]`, sub.image);
    });

    try {
      setLoading(true);
      await apiPatch(`/apiAdmin/v1/category/${id}`, payload);
      toast.success('Category updated successfully');
      navigate('/category/view-all');
    } catch (error) {
      console.error('Update failed', error);
      toast.error('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubcategory = () => {
    setFormData(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, { name: '', image: '' }]
    }));
  };

  const handleRemoveSubcategory = (index) => {
    const updated = [...formData.subcategories];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, subcategories: updated }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 700, margin: 'auto', mt: 5, p: 3, boxShadow: 3 }}
    >
      <Typography variant="h4" gutterBottom>Edit Category</Typography>

      <TextField
        fullWidth
        label="Category Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Category Icon URL"
        name="icon"
        value={formData.icon}
        onChange={handleChange}
        margin="normal"
        required
      />

      {/* Icon preview */}
      {formData.icon && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Icon Preview:</Typography>
          <img
            src={formData.icon}
            alt="Icon Preview"
            style={{ maxWidth: 100, marginTop: 4 }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Box>
      )}

      {/* Subcategory section */}
      {formData.subcategories.map((sub, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <TextField
            fullWidth
            label={`Subcategory Name ${index + 1}`}
            value={sub.name}
            onChange={(e) => handleSubcategoryChange(index, e.target.value, 'name')}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Subcategory Image URL"
            value={sub.image}
            onChange={(e) => handleImageUrlChange(index, e)}
            margin="normal"
            required
          />

          {sub.image && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">Preview:</Typography>
              <img
                src={sub.image}
                alt={`Preview ${index}`}
                style={{ maxWidth: 100, marginTop: 4 }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Box>
          )}

          <Box sx={{ mt: 1 }}>
            <IconButton
              color="error"
              onClick={() => handleRemoveSubcategory(index)}
              disabled={formData.subcategories.length === 1}
            >
              <RemoveCircleOutline />
            </IconButton>
            <IconButton color="primary" onClick={handleAddSubcategory}>
              <AddCircleOutline />
            </IconButton>
          </Box>
        </Paper>
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Update Category'}
      </Button>
    </Box>
  );
};

export default EditCategory;
