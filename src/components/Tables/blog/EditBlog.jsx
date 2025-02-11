import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, FormControlLabel, Switch, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { apiGet, apiPost } from "../../../utils/http"; 
import { toast } from "react-toastify";

const getSingleBlogAPI = "apiAdmin/v1/blog/singleBlog";
const updateBlogAPI = "apiAdmin/v1/blog/updateBlog";
const deleteBlogAPI = "apiAdmin/v1/blog/deleteBlog";  

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
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleDeleteConfirm = async () => {
    try {
      await apiGet(`${deleteBlogAPI}/${id}`);
      toast.success("Blog deleted successfully");
      navigate("/blogs/view-all");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3, boxShadow: 3, marginTop: "50px" }}>
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

            <Typography variant="h6" sx={{ mb: 1 }}>Slug Content</Typography>
            <Editor
              apiKey="miflkqi97aug225uq3gzzof6x2wm6qnw9so0csr8o98k6vye"
              value={blogData.slugContent}
              init={{
                plugins: [
                  // Core editing features
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                  // Your account includes a free trial of TinyMCE premium features
                  // Try the most popular premium features until Feb 24, 2025:
                  'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
              }}
              onEditorChange={handleSlugContentChange}
            />
            <FormControlLabel
              control={<Switch checked={blogData.isStatus} onChange={handleToggleStatus} />}
              label={blogData.isStatus ? "Active" : "Inactive"}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Update Blog
              </Button>
              <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
                Delete Blog
              </Button>
            </Box>
          </form>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBlog;
