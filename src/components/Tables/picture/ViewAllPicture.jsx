import { useState, useEffect } from "react";
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
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiGet, apiDelete } from "../../../utils/http"; // Make sure apiDelete is defined

const getHomeAPI = "apiAdmin/v1/trip-picture";
const deleteAPI = "apiAdmin/v1/trip-picture"; // Assuming delete endpoint is /trip-picture/:id

const ViewAllPicture = () => {
  const [homeItems, setHomeItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const ipURL = import.meta.env.VITE_API_URL;
  const baseURL = ipURL.endsWith("/") ? ipURL.slice(0, -1) : ipURL;

  useEffect(() => {
    fetchHomeItems();
  }, []);

  const fetchHomeItems = async () => {
    try {
      const response = await apiGet(getHomeAPI);
      if (response?.data && Array.isArray(response.data)) {
        setHomeItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching home items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDelete(`${deleteAPI}/${id}`);
      setHomeItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${baseURL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
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
        align="center"
        color="primary"
        fontWeight="bold"
        mb={4}
      >
        View Pictures
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
      >
        <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {["#", "Title", " Picture", "Action"].map((head) => (
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
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : homeItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No content found.
                </TableCell>
              </TableRow>
            ) : (
              homeItems.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <img
                      src={getImageSrc(item.imageUrl)}
                      alt="Banner"
                      width={100}
                      height={60}
                      style={{ borderRadius: "5px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/100x60?text=Image+Not+Found";
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item._id)}
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

export default ViewAllPicture;
