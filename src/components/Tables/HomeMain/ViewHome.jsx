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
    bannerFile: null, // File input for the banner image
    logoFile: null, // File input for the logo
    useBannerUrl: true, // Flag to check whether to use the URL or file
    useLogoUrl: true, // Flag to check whether to use the URL or file
  });
  
  const ipURL = import.meta.env.VITE_API_URL
  const bannerImg = `${ipURL.slice(0, ipURL.length - 1)}`

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
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUpdatedData({ ...updatedData, [name]: files[0] });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    setLoading(true);

    const formData = new FormData();
    if (updatedData.useBannerUrl) {
      formData.append("bannerImg", updatedData.banerImg); // URL if selected
    } else if (updatedData.bannerFile) {
      formData.append("bannerImg", updatedData.bannerFile); // File if selected
    }

    if (updatedData.useLogoUrl) {
      formData.append("logoUrl", updatedData.logoUrl); // URL if selected
    } else if (updatedData.logoFile) {
      formData.append("logoUrl", updatedData.logoFile); // File if selected
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
      }
    } catch (error) {
      console.error("Error updating item:", error);
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
        View Home Content
      </h2>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
      >
        <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {["#", "Title", "Banner Image",  "Actions"].map(
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
            ) : !homeItem ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                    />
                  ) : (
                    homeItem.headingText
                  )}
                </TableCell>

                <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {editing ? (
                    <>
                      <TextField
                        name="bannerImg"
                        value={updatedData.bannerImg}
                        onChange={handleInputChange}
                        size="small"
                        disabled={!updatedData.useBannerUrl}
                      />
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="useBannerUrl"
                          value="false"
                          checked={!updatedData.useBannerUrl}
                          onChange={() =>
                            setUpdatedData({
                              ...updatedData,
                              useBannerUrl: false,
                            })
                          }
                        />
                        Upload File
                      </label>
                      {!updatedData.useBannerUrl && (
                        <Input
                          type="file"
                          name="bannerFile"
                          onChange={handleFileChange}
                          inputProps={{ accept: "image/*" }}
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={`${bannerImg}${updatedData.bannerImg}`}
                      alt="Banner"
                      width={50}
                      height={50}
                      style={{ borderRadius: "5px" }}
                    />
                  )}
                </TableCell>

                {/* <TableCell
                  sx={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  {editing ? (
                    <>
                      <TextField
                        name="logoUrl"
                        value={updatedData.logoUrl}
                        onChange={handleInputChange}
                        size="small"
                        disabled={!updatedData.useLogoUrl}
                      />
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="useLogoUrl"
                          value="true"
                          checked={updatedData.useLogoUrl}
                          onChange={() =>
                            setUpdatedData({ ...updatedData, useLogoUrl: true })
                          }
                        />
                        Use URL
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="useLogoUrl"
                          value="false"
                          checked={!updatedData.useLogoUrl}
                          onChange={() =>
                            setUpdatedData({
                              ...updatedData,
                              useLogoUrl: false,
                            })
                          }
                        />
                        Upload File
                      </label>
                      {!updatedData.useLogoUrl && (
                        <Input
                          type="file"
                          name="logoFile"
                          onChange={handleFileChange}
                          inputProps={{ accept: "image/*" }}
                        />
                      )}
                    </>
                  ) : (
                    homeItem.logoUrl
                  )}
                </TableCell> */}

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
                    >
                      Save
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
