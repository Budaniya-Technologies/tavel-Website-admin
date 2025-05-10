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
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { apiGet, apiPatch } from "../../../utils/http";

const getHomeAPI = "apiAdmin/v1/homepage";
const updateHomeAPI = "apiAdmin/v1/homepage";

const ViewHome = () => {
  const [homeItem, setHomeItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    bannerImg: "",
    headingText: "",
    logoUrl: "",
    bannerFile: null,
    logoFile: null,
    useBannerUrl: true,
    useLogoUrl: true,
  });
  
  const ipURL = import.meta.env.VITE_API_URL;
  const baseURL = ipURL.endsWith('/') ? ipURL.slice(0, -1) : ipURL;

  useEffect(() => {
    fetchHomeItem();
  }, []);

  const fetchHomeItem = async () => {
    setLoading(true);
    try {
      const response = await apiGet(getHomeAPI);
      if (response?.data) {
        setHomeItem(response.data);
        setUpdatedData({
          bannerImg: response.data.bannerImg,
          headingText: response.data.headingText,
          logoUrl: response.data.logoUrl,
          bannerFile: null,
          logoFile: null,
          useBannerUrl: true,
          useLogoUrl: true,
        });
      }
    } catch (error) {
      console.error("Error fetching home item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUpdatedData({ ...updatedData, [name]: files[0] });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveClick = async () => {
    // Validate URL if using URL option
    if (updatedData.useBannerUrl && updatedData.bannerImg) {
      if (!validateUrl(updatedData.bannerImg)) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
      }
    }

    setLoading(true);

    const formData = new FormData();
    
    // Handle banner image
    if (updatedData.useBannerUrl) {
      formData.append("bannerImg", updatedData.bannerImg);
    } else if (updatedData.bannerFile) {
      formData.append("bannerImg", updatedData.bannerFile);
    }

    // Handle logo
    if (updatedData.useLogoUrl) {
      formData.append("logoUrl", updatedData.logoUrl);
    } else if (updatedData.logoFile) {
      formData.append("logoUrl", updatedData.logoFile);
    }

    formData.append("headingText", updatedData.headingText);

    try {
      const response = await apiPatch(
        updateHomeAPI,
        formData,
        "multipart/form-data"
      );
      if (response?.data) {
        setHomeItem(response.data);
        setEditing(false);
        fetchHomeItem(); // Refresh data after update
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "";
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Otherwise, prepend the base URL
    return `${baseURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
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
        View Home Content
      </h2>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
      >
        <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {["#", "Title", "Banner Image", "Actions"].map((head) => (
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
            {loading && !editing ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !homeItem ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No content found.
                </TableCell>
              </TableRow>
            ) : (
              <TableRow
                key={homeItem._id}
                sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
              >
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  1
                </TableCell>

                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {editing ? (
                    <TextField
                      name="headingText"
                      value={updatedData.headingText}
                      onChange={handleInputChange}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    homeItem.headingText
                  )}
                </TableCell>

                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {editing ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          name="useBannerUrl"
                          value={updatedData.useBannerUrl.toString()}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              useBannerUrl: e.target.value === "true",
                            })
                          }
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio size="small" />}
                            label="Use URL"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio size="small" />}
                            label="Upload File"
                          />
                        </RadioGroup>
                      </FormControl>
                      
                      {updatedData.useBannerUrl ? (
                        <>
                          <TextField
                            name="bannerImg"
                            value={updatedData.bannerImg}
                            onChange={handleInputChange}
                            size="small"
                            fullWidth
                            placeholder="Enter image URL (http:// or https://)"
                            error={updatedData.bannerImg && !validateUrl(updatedData.bannerImg)}
                            helperText={updatedData.bannerImg && !validateUrl(updatedData.bannerImg) ? "Please enter a valid URL" : ""}
                          />
                          {updatedData.bannerImg && validateUrl(updatedData.bannerImg) && (
                            <Box mt={1}>
                              <img
                                src={updatedData.bannerImg}
                                alt="URL Preview"
                                width={100}
                                height={60}
                                style={{ borderRadius: "5px" }}
                                onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.src = "https://via.placeholder.com/100x60?text=Invalid+URL";
                                }}
                              />
                            </Box>
                          )}
                        </>
                      ) : (
                        <Box>
                          <Input
                            type="file"
                            name="bannerFile"
                            onChange={handleFileChange}
                            inputProps={{ accept: "image/*" }}
                            fullWidth
                          />
                          {updatedData.bannerFile && (
                            <Box mt={1}>
                              <img
                                src={URL.createObjectURL(updatedData.bannerFile)}
                                alt="Preview"
                                width={100}
                                height={60}
                                style={{ borderRadius: "5px" }}
                              />
                              <Typography variant="caption" display="block">
                                {updatedData.bannerFile.name}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      <img
                        src={getImageSrc(homeItem.bannerImg)}
                        alt="Banner"
                        width={100}
                        height={60}
                        style={{ borderRadius: "5px" }}
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://via.placeholder.com/100x60?text=Image+Not+Found";
                        }}
                      />
                      {homeItem.bannerImg && (
                        <Typography variant="caption" display="block">
                          {homeItem.bannerImg.startsWith('http')}
                        </Typography>
                      )}
                    </Box>
                  )}
                </TableCell>

                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {editing ? (
                    <Button
                      onClick={handleSaveClick}
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<SaveIcon />}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Save"}
                    </Button>
                  ) : (
                    <IconButton color="primary" onClick={handleEditClick}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewHome;