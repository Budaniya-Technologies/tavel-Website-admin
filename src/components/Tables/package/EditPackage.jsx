import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { apiGet, apiPost } from "../../../utils/http";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const getSinglePackageAPI = "apiAdmin/v1/package/singlePackage";
const updatePackageAPI = "apiAdmin/v1/package/updatePackage";
const deletePackageAPI = "apiAdmin/v1/package/deletePackage";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    pickUpPoint: "",
    dropPoint: "",
    slug: "",
    slugContent: "",
    isStatus: false,
  });

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    setLoading(true);
    try {
      const response = await apiGet(`${getSinglePackageAPI}/${id}`);
      const data = response.data.data;
      setPackageData({
        title: data.title || "",
        image: data.image || "",
        price: data.price || "",
        duration: data.duration || "",
        pickUpPoint: data.pickUpPoint || "",
        dropPoint: data.dropPoint || "",
        slug: data.slug || "",
        slugContent: data.slugContent || "",
        isStatus: data.isStatus || false,
      });
    } catch (error) {
      console.error("Error fetching package:", error);
      toast.error("Failed to fetch package details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  const handleSlugContentChange = (content) => {
    setPackageData({ ...packageData, slugContent: content });
  };

  const handleToggleStatus = (e) => {
    setPackageData({ ...packageData, isStatus: e.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiPost(`${updatePackageAPI}/${id}`, packageData);
      toast.success("Package updated successfully");
      navigate("/packages/view-all");
    } catch (error) {
      console.error("Error updating package:", error);
      toast.error("Failed to update package");
    }
  };

  const handleDelete = async () => {
    try {
      await apiPost(`${deletePackageAPI}/${id}`);
      toast.success("Package deleted successfully");
      navigate("/packages/view-all");
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3, boxShadow: 3, mt: 5 }}>
      <Paper sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ color: "rgb(63, 81, 181)", fontWeight: "bold", mb: 3 }}>
          Edit Package
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={packageData.title}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={packageData.image}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={packageData.price}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Duration"
              name="duration"
              value={packageData.duration}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Pick-Up Point"
              name="pickUpPoint"
              value={packageData.pickUpPoint}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Drop Point"
              name="dropPoint"
              value={packageData.dropPoint}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={packageData.slug}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Slug Content</Typography>
            <Editor
              apiKey="miflkqi97aug225uq3gzzof6x2wm6qnw9so0csr8o98k6vye"
              value={packageData.slugContent}
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
              control={<Switch checked={packageData.isStatus} onChange={handleToggleStatus} />}
              label={packageData.isStatus ? "Active" : "Inactive"}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Update Package
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/packages/view-all")}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
                Delete
              </Button>
            </Box>
          </form>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this package? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditPackage;
