import { useState, useEffect, useRef } from "react";
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
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
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
    imageFile: null,
    useImageUrl: true,
  });
  const fileInputRef = useRef(null);

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

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setUpdatedData({
          ...updatedData,
          imageFile: file,
          useImageUrl: false,
          image: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRadioChange = (e) => {
    const useUrl = e.target.value === "true";
    setUpdatedData({
      ...updatedData,
      useImageUrl: useUrl,
      imageFile: useUrl ? null : updatedData.imageFile,
    });
  };

  const handleEditClick = (hikingStyle) => {
    setEditingId(hikingStyle._id);
    setUpdatedData({
      title: hikingStyle.title,
      description: hikingStyle.description,
      image: hikingStyle.image,
      imageFile: null,
      useImageUrl: true,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveClick = async () => {
    if (!editingId) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("description", updatedData.description);

      if (updatedData.useImageUrl) {
        formData.append("image", updatedData.image);
      } else if (updatedData.imageFile) {
        formData.append("image", updatedData.imageFile);
      }

      const response = await apiPut(
        `${updateHikingStyleAPI}/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
        View Hiking Styles
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
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
                  <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
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

                  <TableCell sx={{ textAlign: "center" }}>
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

                  <TableCell sx={{ textAlign: "center" }}>
                    {editingId === hikingStyle._id ? (
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <RadioGroup
                          row
                          name="useImageUrl"
                          value={updatedData.useImageUrl.toString()}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Use URL"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Upload File"
                          />
                        </RadioGroup>

                        {updatedData.useImageUrl ? (
                          <TextField
                            name="image"
                            value={updatedData.image}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                            placeholder="Enter image URL"
                          />
                        ) : (
                          <Box>
                            <Button
                              variant="contained"
                              component="label"
                              size="small"
                            >
                              Upload Image
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                hidden
                              />
                            </Button>
                            {updatedData.imageFile && (
                              <Typography variant="caption" display="block">
                                {updatedData.imageFile.name}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <img
                        src={getImageUrl(hikingStyle.image)}
                        alt={hikingStyle.title}
                        width={100}
                        height={60}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                      />
                    )}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    {editingId === hikingStyle._id ? (
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
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
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
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