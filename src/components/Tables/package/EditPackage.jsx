import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, FormControlLabel, Switch, Paper } from "@mui/material";
import { apiGet, apiPost } from "../../../utils/http"; 
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const getSinglePackageAPI = "apiAdmin/v1/package/singlePackage";
const updatePackageAPI = "apiAdmin/v1/package/updatePackage";

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
    slugContent: "", // Added slugContent
    isStatus: false,
  });

  const [loading, setLoading] = useState(false);

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
        slugContent: data.slugContent || "", // Fetching slugContent
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

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3, boxShadow: 3, marginTop: "50px" }}>
      <Paper sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ color: "rgb(63, 81, 181)", fontWeight: "bold", mb: 3 }}>
          Edit Package
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Title" name="title" value={packageData.title} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Image URL" name="image" value={packageData.image} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Price" name="price" type="number" value={packageData.price} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Duration" name="duration" value={packageData.duration} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Pick-Up Point" name="pickUpPoint" value={packageData.pickUpPoint} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Drop Point" name="dropPoint" value={packageData.dropPoint} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Slug" name="slug" value={packageData.slug} onChange={handleChange} required sx={{ mb: 2 }} />

            {/* Rich Text Editor for Slug Content */}
            <Typography sx={{ mb: 1, fontWeight: "bold" }}>Slug Content</Typography>
            <ReactQuill theme="snow" value={packageData.slugContent} onChange={handleSlugContentChange} style={{ marginBottom: "20px" }} />

            <FormControlLabel
              control={<Switch checked={packageData.isStatus} onChange={handleToggleStatus} />}
              label={packageData.isStatus ? "Active" : "Inactive"}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Update Package
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/view-all-packages")}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default EditPackage;
