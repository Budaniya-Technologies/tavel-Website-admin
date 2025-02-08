import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, FormControlLabel, Switch, Paper } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiGet, apiPost } from "../../../utils/http"; 
import { toast } from "react-toastify";

const getSingleBlogAPI = "apiAdmin/v1/blog/singleBlog";
const updateBlogAPI = "apiAdmin/v1/blog/updateBlog";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: "",
    slug: "",
    slugContent: "",
    category: "",
    isStatus: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await apiGet(`${getSingleBlogAPI}/${id}`);
      const data = response.data.data;
      setBlogData({
        title: data.title || "",
        description: data.description || "",
        image: data.image || "",
        slug: data.slug || "",
        slugContent: data.slugContent || "",
        category: data.category || "",
        isStatus: data.isStatus || false,
      });
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to fetch blog details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSlugContentChange = (value) => {
    setBlogData({ ...blogData, slugContent: value });
  };

  const handleToggleStatus = (e) => {
    setBlogData({ ...blogData, isStatus: e.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiPost(`${updateBlogAPI}/${id}`, blogData);
      toast.success("Blog updated successfully");
      navigate("/blogs/view-all");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3, boxShadow: 3, marginTop: "50px" }}>
      <Paper sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ color: "rgb(63, 81, 181)", fontWeight: "bold", mb: 3 }}>
          Edit Blog
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Title" name="title" value={blogData.title} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Description" name="description" value={blogData.description} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Image URL" name="image" value={blogData.image} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Slug" name="slug" value={blogData.slug} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Category" name="category" value={blogData.category} onChange={handleChange} required sx={{ mb: 2 }} />

            {/* Rich Text Editor for Slug Content */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              Slug Content
            </Typography>
            <ReactQuill value={blogData.slugContent} onChange={handleSlugContentChange} style={{ height: "200px", marginBottom: "20px" }} />

            <FormControlLabel
              control={<Switch checked={blogData.isStatus} onChange={handleToggleStatus} />}
              label={blogData.isStatus ? "Active" : "Inactive"}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Update Blog
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/view-all-blogs")}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default EditBlog;
