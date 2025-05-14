import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiGet, apiDelete } from "../../../utils/http";

const getHikingStyleAPI = "apiAdmin/v1/testimonial";
const deleteHikingStyleAPI = "apiAdmin/v1/testimonial";

const ViewReview = () => {
  const [hikingStyles, setHikingStyles] = useState([]);
  const [loading, setLoading] = useState(false);

  const ipURL = import.meta.env.VITE_API_URL;
  const baseImageUrl = ipURL.endsWith("/") ? ipURL.slice(0, -1) : ipURL;

  useEffect(() => {
    fetchHikingStyles();
  }, []);

  const fetchHikingStyles = async () => {
    setLoading(true);
    try {
      const response = await apiGet(getHikingStyleAPI);
      if (response?.data) {
        setHikingStyles(response.data);
      }
    } catch (error) {
      console.error("Error fetching hiking styles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    setLoading(true);
    try {
      await apiDelete(`${deleteHikingStyleAPI}/${id}`);
      setHikingStyles(hikingStyles.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${baseImageUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#3f51b5",
          fontWeight: "bold",
          margin: "30px",
        }}
      >
        View Reviews
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {["#", "Title", "Description", "Rating", "Image", "Action"].map(
                (head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : hikingStyles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              hikingStyles.map((style, index) => (
                <TableRow
                  key={style._id}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell sx={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {style.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {style.description}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Rating value={style.rating} precision={0.5} readOnly />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <img
                      src={getImageUrl(style.profileImage)}
                      alt={style.name}
                      width={100}
                      height={60}
                      style={{ borderRadius: "5px", objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(style._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewReview;
