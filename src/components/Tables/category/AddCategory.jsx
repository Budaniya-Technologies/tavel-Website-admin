import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
import { toast } from "react-toastify";
import { apiPost } from "../../../utils/http";
import DeleteIcon from "@mui/icons-material/Delete";

const AddCategoryAPI = "/apiAdmin/v1/category";

const AddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    icon: "",
    subcategories: [
      { name: "", description: "", image: null, imageFile: null }
    ],
  });

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updated = [...formData.subcategories];
    updated[index][field] = value;

    if (field === "imageFile") updated[index]["image"] = null;
    if (field === "image") updated[index]["imageFile"] = null;

    setFormData({ ...formData, subcategories: updated });
  };

  const addSubcategoryField = () => {
    setFormData({
      ...formData,
      subcategories: [
        ...formData.subcategories,
        { name: "", description: "", image: null, imageFile: null }
      ],
    });
  };

  const removeSubcategoryField = (index) => {
    const updated = formData.subcategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subcategories: updated });
  };

  const validateForm = () => {
    if (!formData.categoryName?.trim()) {
      toast.error("Category name is required");
      return false;
    }

    for (const sub of formData.subcategories) {
      if (!sub.name?.trim()) {
        toast.error("All subcategory names are required");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const data = new FormData();
      data.append("categoryName", formData.categoryName.trim());
      if (formData.icon) {
        data.append("icon", formData.icon.trim());
      }

      formData.subcategories.forEach((sub, index) => {
        data.append(`subcategories[${index}][name]`, sub.name.trim());
        data.append(`subcategories[${index}][description]`, sub.description.trim());

        if (sub.imageFile) {
          data.append(`subcategories[${index}][image]`, sub.imageFile);
        } else if (sub.image) {
          data.append(`subcategories[${index}][image]`, sub.image);
        }
      });

      const response = await apiPost(AddCategoryAPI, data);

      if (response.data?.message === "category created successfully") {
        const category = response.data?.category;
        const subNames = category?.subcategories?.map(sub => sub.name).join(", ");
        toast.success(
          `Category "${category?.categoryName}" with subcategories (${subNames}) created successfully.`,
          { position: "top-right", autoClose: 3000 }
        );

        setTimeout(() => {
          navigate("/category/view-all");
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to create category");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create category", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      categoryName: "",
      icon: "",
      subcategories: [{ name: "", description: "", image: null, imageFile: null }],
    });
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 3, boxShadow: 3, marginTop: "60px", backgroundColor: "#fff" }}>
      <Typography variant="h4" align="center" sx={{ color: "rgb(63, 81, 181)", fontWeight: "bold", mb: 3 }}>
        Create Category
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                name="categoryName"
                variant="outlined"
                fullWidth
                value={formData.categoryName}
                onChange={handleCategoryChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Icon (optional)"
                name="icon"
                variant="outlined"
                fullWidth
                value={formData.icon}
                onChange={handleCategoryChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Subcategories</Typography>
              {formData.subcategories.map((sub, index) => (
                <Box key={index} sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: 2, mb: 2 }}>
                  <TextField
                    label="Subcategory Name"
                    variant="outlined"
                    fullWidth
                    value={sub.name}
                    onChange={(e) => handleSubcategoryChange(index, "name", e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={sub.description}
                    onChange={(e) => handleSubcategoryChange(index, "description", e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    label="Image URL (optional)"
                    variant="outlined"
                    fullWidth
                    value={sub.image || ""}
                    onChange={(e) => handleSubcategoryChange(index, "image", e.target.value)}
                    disabled={Boolean(sub.imageFile)}
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body2">Or upload image file:</Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSubcategoryChange(index, "imageFile", e.target.files[0])}
                    disabled={Boolean(sub.image)}
                    style={{ marginTop: "8px", marginBottom: "8px" }}
                  />

                  {formData.subcategories.length > 1 && (
                    <IconButton color="error" onClick={() => removeSubcategoryField(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button variant="outlined" onClick={addSubcategoryField}>
                + Add Subcategory
              </Button>
            </Grid>
          </Grid>

          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
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
    </Box>
  );
};

export default AddCategory;
