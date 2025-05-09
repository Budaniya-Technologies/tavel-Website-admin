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

const AddHomeAPI = "apiAdmin/v1/home/addHome";

const AddHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0], imageUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      if (formData.imageFile) {
        data.append("image", formData.imageFile);
      } else {
        data.append("image", formData.imageUrl);
      }

      const response = await apiPost(AddHomeAPI, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);
      toast.success("Home content created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/homemain/view-all");
      }, 3000);
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Failed to create Home content.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", imageUrl: "", imageFile: null });
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
        Create Home Content
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Image URL (optional)"
                name="imageUrl"
                variant="outlined"
                fullWidth
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={Boolean(formData.imageFile)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Or Upload Image File:
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={Boolean(formData.imageUrl)}
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

export default AddHome;
