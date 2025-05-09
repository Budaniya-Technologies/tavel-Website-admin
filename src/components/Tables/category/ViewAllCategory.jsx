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
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from "../../../utils/http";

const getCategoriesAPI = "/apiAdmin/v1/category";

const ViewAllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiGet(getCategoriesAPI);
      const data = response.data?.data || response.data || [];
      console.log(data)
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    try {
      await apiDelete(`${getCategoriesAPI}/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (id) => {
    navigate(`/category/edit/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        View All Categories
      </h2>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
      >
        <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              {["#", "Name", "Icon", "Subcategories", "Actions"].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    ...(head === "Subcategories" ? { width: "40%" } : {}),
                    ...(head === "Actions" ? { width: "150px" } : {}),
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
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              categories
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((category, index) => (
                  <TableRow
                    key={category._id || index}
                    sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #ddd", textAlign: "center" }}
                    >
                      {category?.categoryName || "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #ddd", textAlign: "center" }}
                    >
                      {category?.icon ? (
                        <img
                          src={category.icon}
                          alt="icon"
                          style={{
                            width: 30,
                            height: 30,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd", padding: 0 }}>
                      <TableContainer
                        component={Paper}
                        sx={{
                          boxShadow: "none",
                          maxHeight: "200px",
                          overflow: "auto",
                        }}
                      >
                        <Table size="small" sx={{ backgroundColor: "#fafafa" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                              >
                                Name
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                              >
                                Image
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {category.subcategories?.length > 0 ? (
                              category.subcategories.map((sub, subIndex) => (
                                <TableRow key={sub._id || subIndex}>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {sub.name || "Unnamed"}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    {sub.image ? (
                                      <img
                                        src={sub.image}
                                        alt={sub.name}
                                        style={{
                                          maxWidth: "100px",
                                          maxHeight: "50px",
                                        }}
                                      />
                                    ) : (
                                      "No image"
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={2} align="center">
                                  No subcategories
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #ddd", textAlign: "center" }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(category._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(category._id)}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ViewAllCategory;
