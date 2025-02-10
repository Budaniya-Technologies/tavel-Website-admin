import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { apiPost } from "../../../utils/http";

// API Endpoint
const AddPackageAPI = "apiAdmin/v1/package/addPackage";

const AddPackage = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    pickUpPoint: "",
    dropPoint: "",
    image: "",
    pdf: "",
    slug: "",
    slugContent: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, slugContent: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiPost(AddPackageAPI, formData);
      console.log("API Response:", response.data);

      toast.success("Package created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/packages/view-all");
      }, 3000);
    } catch (err) {
      console.error("API Error:", err?.response?.data || err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to create package. Please try again.",
        { position: "top-right", autoClose: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      pickUpPoint: "",
      dropPoint: "",
      image: "",
      pdf: "",
      slug: "",
      slugContent: "",
    });

    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        marginTop: "60px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "rgb(63, 81, 181)",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Create Package
      </h2>

      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              { label: "Package Name", name: "title" },
              { label: "Description", name: "description" },
              { label: "Price", name: "price", type: "number" },
              { label: "Duration", name: "duration" },
              { label: "Pick Up Point", name: "pickUpPoint" },
              { label: "Drop Point", name: "dropPoint" },
              { label: "Image URL", name: "image" },
              { label: "PDF URL", name: "pdf" },
              { label: "Slug", name: "slug" },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  sx={{ marginBottom: "20px" }}
                  required
                />
              </Grid>
            ))}

            {/* TinyMCE Editor for Slug Content */}
            <Grid item xs={12}>
              <label
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                Slug Content
              </label>
              <Editor
                apiKey="miflkqi97aug225uq3gzzof6x2wm6qnw9so0csr8o98k6vye"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  plugins: [
                    // Core editing features
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Feb 24, 2025:
                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                  ],
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                  ],
                  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                }}
                onEditorChange={handleEditorChange}
              />
            </Grid>
          </Grid>

          {/* Submit and Cancel Buttons */}
          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
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

export default AddPackage;
