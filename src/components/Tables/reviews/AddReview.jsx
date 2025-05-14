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
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost } from "../../../utils/http";

const AddReviewAPI = "apiAdmin/v1/testimonial";

const AddReview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    rating: "",
    profileImageUrl: "",
    profileImageFile: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImageFile: e.target.files[0],
      profileImageUrl: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("designation", formData.designation);
      data.append("description", formData.description);
      data.append("rating", formData.rating);

      if (formData.profileImageFile) {
        data.append("image", formData.profileImageFile);
      } else {
        data.append("image", formData.profileImageUrl);
      }

      const response = await apiPost(AddReviewAPI, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      toast.success("Review added successfully!", { position: "top-right" });

      setTimeout(() => {
        navigate("/reviews/view");
      }, 2000);
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Failed to add review.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      designation: "",
      description: "",
      rating: "",
      profileImageUrl: "",
      profileImageFile: null,
    });
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
        Add Review
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
              <TextField
                label="Designation"
                name="designation"
                variant="outlined"
                fullWidth
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Rating"
                name="rating"
                select
                fullWidth
                value={formData.rating}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Or Upload Profile Image:
              </Typography>
              <input
                disabled={Boolean(formData.profileImageFile)}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                // disabled={Boolean(formData.profileImageUrl)}
              />
            </Grid>
          </Grid>

          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default AddReview;
