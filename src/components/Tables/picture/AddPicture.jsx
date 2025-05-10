import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost } from "../../../utils/http";

const AddHomeAPI = "apiAdmin/v1/trip-picture";

const AddPicture = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error("Please upload an image file.");
      return;
    }
  
    setLoading(true);
  
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("imageUrl", formData.imageUrl); // <-- key fix
  
      const response = await apiPost(AddHomeAPI, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const imagePath = response?.data?.doc?.imageUrl || "";
  
      toast.success("Trip picture added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
  
      console.log("Uploaded Image Path:", imagePath);
  
      setTimeout(() => {
        navigate("/pictures/view-all");
      }, 3000);
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Failed to create trip picture.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", imageUrl: null });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        marginTop: "60px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "rgb(63, 81, 181)", fontWeight: "bold", mb: 3 }}
      >
        Upload Trip Picture
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Upload Image File:
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
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

export default AddPicture;
