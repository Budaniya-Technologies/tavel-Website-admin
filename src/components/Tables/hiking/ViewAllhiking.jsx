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
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiGet, apiDelete, apiPut } from "../../../utils/http";

const getHikingStyleAPI = "apiAdmin/v1/hiking-style";
const updateHikingStyleAPI = "apiAdmin/v1/hiking-style";
const deleteHikingStyleAPI = "apiAdmin/v1/hiking-style";

const ViewAllHiking = () => {
  const [hikingStyles, setHikingStyles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    image: "",
  });

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

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (hikingStyle) => {
    setEditingId(hikingStyle._id);
    setUpdatedData({
      title: hikingStyle.title,
      description: hikingStyle.description,
      image: hikingStyle.image,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveClick = async () => {
    if (!editingId) return;

    setLoading(true);

    try {
      const payload = {
        title: updatedData.title,
        description: updatedData.description,
        image: updatedData.image,
      };

      console.log("Sending update:", payload);

      const response = await apiPut(
        `${updateHikingStyleAPI}/${editingId}`,
        payload
      );

      console.log("API Response:", response.data);

      if (response?.data) {
        setHikingStyles(hikingStyles.map(item => 
          item._id === editingId ? response.data : item
        ));
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating hiking style:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hiking style?")) {
      return;
    }

    setLoading(true);
    try {
      await apiDelete(`${deleteHikingStyleAPI}/${id}`);
      setHikingStyles(hikingStyles.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting hiking style:", error);
    } finally {
      setLoading(false);
    }
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
      <h2
        style={{
          textAlign: "center",
          color: "#3f51b5",
          fontWeight: "bold",
          margin: "30px",
          fontSize: "2rem",
        }}
      >
        View Hiking Styles
      </h2>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
      >
        <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {["#", "Title", "Description", "Image", "Actions"].map((head) => (
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
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : hikingStyles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hiking styles found.
                </TableCell>
              </TableRow>
            ) : (
              hikingStyles.map((hikingStyle, index) => (
                <TableRow
                  key={hikingStyle._id}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </TableCell>

                  <TableCell
                    sx={{ border: "1px solid #ddd", textAlign: "center" }}
                  >
                    {editingId === hikingStyle._id ? (
                      <TextField
                        name="title"
                        value={updatedData.title}
                        onChange={handleInputChange}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      hikingStyle.title
                    )}
                  </TableCell>

                  <TableCell
                    sx={{ border: "1px solid #ddd", textAlign: "center" }}
                  >
                    {editingId === hikingStyle._id ? (
                      <TextField
                        name="description"
                        value={updatedData.description}
                        onChange={handleInputChange}
                        size="small"
                        fullWidth
                        multiline
                      />
                    ) : (
                      hikingStyle.description
                    )}
                  </TableCell>

                  <TableCell
                    sx={{ border: "1px solid #ddd", textAlign: "center" }}
                  >
                    {editingId === hikingStyle._id ? (
                      <TextField
                        name="image"
                        value={updatedData.image}
                        onChange={handleInputChange}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      <img
                        src={hikingStyle.image}
                        alt={hikingStyle.title}
                        width={100}
                        height={60}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                      />
                    )}
                  </TableCell>

                  <TableCell
                    sx={{ border: "1px solid #ddd", textAlign: "center" }}
                  >
                    {editingId === hikingStyle._id ? (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          onClick={handleSaveClick}
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outlined"
                          color="error"
                          size="small"
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditClick(hikingStyle)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDelete(hikingStyle._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
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

export default ViewAllHiking;