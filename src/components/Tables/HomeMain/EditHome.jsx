// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   FormControlLabel,
//   Switch,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { Editor } from "@tinymce/tinymce-react";
// import { apiGet, apiPost } from "../../../utils/http";
// import { toast } from "react-toastify";

// const getSingleHomeAPI = "apiAdmin/v1/home/singleHome";
// const updateHomeAPI = "apiAdmin/v1/home/updateHome";
// const deleteHomeAPI = "apiAdmin/v1/home/deleteHome";

// const EditHome = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [homeData, setHomeData] = useState({
//     title: "",
//     subtitle: "",
//     bannerImage: "",
//     content: "",
//     isStatus: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     fetchHomeDetails();
//   }, []);

//   const fetchHomeDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await apiGet(`${getSingleHomeAPI}/${id}`);
//       const data = response.data.data;
//       setHomeData({
//         title: data.title || "",
//         subtitle: data.subtitle || "",
//         bannerImage: data.bannerImage || "",
//         content: data.content || "",
//         isStatus: data.isStatus || false,
//       });
//     } catch (error) {
//       console.error("Error fetching home content:", error);
//       toast.error("Failed to fetch home content.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setHomeData({ ...homeData, [name]: value });
//   };

//   const handleContentChange = (value) => {
//     setHomeData({ ...homeData, content: value });
//   };

//   const handleToggleStatus = (e) => {
//     setHomeData({ ...homeData, isStatus: e.target.checked });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await apiPost(`${updateHomeAPI}/${id}`, homeData);
//       toast.success("Home content updated successfully");
//       navigate("/home/view-all");
//     } catch (error) {
//       console.error("Error updating home:", error);
//       toast.error("Failed to update home content");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await apiGet(`${deleteHomeAPI}/${id}`);
//       toast.success("Home content deleted successfully");
//       navigate("/home/view-all");
//     } catch (error) {
//       console.error("Error deleting home content:", error);
//       toast.error("Failed to delete home content");
//     } finally {
//       setOpenDialog(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3, boxShadow: 3, marginTop: "50px" }}>
//       <Paper sx={{ padding: 3, borderRadius: 2 }}>
//         <Typography variant="h4" align="center" sx={{ color: "rgb(63, 81, 181)", fontWeight: "bold", mb: 3 }}>
//           Edit Home Content
//         </Typography>

//         {loading ? (
//           <Typography align="center">Loading...</Typography>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               value={homeData.title}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               fullWidth
//               label="Subtitle"
//               name="subtitle"
//               value={homeData.subtitle}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               fullWidth
//               label="Banner Image URL"
//               name="bannerImage"
//               value={homeData.bannerImage}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />

//             <Typography variant="h6" sx={{ mb: 1 }}>Content</Typography>
//             <Editor
//               apiKey="miflkqi97aug225uq3gzzof6x2wm6qnw9so0csr8o98k6vye"
//               value={homeData.content}
//               init={{
//                 plugins: [
//                   'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
//                   'image', 'link', 'lists', 'media', 'searchreplace', 'table',
//                   'visualblocks', 'wordcount'
//                 ],
//                 toolbar:
//                   'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | removeformat',
//               }}
//               onEditorChange={handleContentChange}
//             />

//             <FormControlLabel
//               control={<Switch checked={homeData.isStatus} onChange={handleToggleStatus} />}
//               label={homeData.isStatus ? "Active" : "Inactive"}
//               sx={{ mb: 2 }}
//             />

//             <Box display="flex" justifyContent="space-between">
//               <Button variant="contained" color="primary" type="submit">
//                 Update Home
//               </Button>
//               <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
//                 Delete Home
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Paper>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this home content? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteConfirm} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default EditHome;
