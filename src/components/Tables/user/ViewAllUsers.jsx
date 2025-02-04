import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  CircularProgress,
  Paper,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiGet } from "../../../utils/http";
const getAdminUsers = "apiAdmin/v1/user/getUsers";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiGet(getAdminUsers);
      const usersData = response.data.data; // Assuming the users are in `data`
      setUsers(usersData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)); // Pagination simulation
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log(`Deleting user with ID: ${userId}`);
      setSuccess(true);
      fetchUsers();
    } catch (err) {
      setError("An error occurred while deleting the user.");
    } finally {
      setOpenSnackbar(true);
    }
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
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
          color: "rgb(63, 81, 181)",
        }}
      >
        View All Users
      </h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Username
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  color: "#333",
                  border: "1px solid #ddd",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <TableCell
                    sx={{ border: "1px solid #ddd"}}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid #ddd" }}
                  >
                    {user.fullName}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid #ddd" }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid #ddd" }}
                  >
                    {user.mobileNumber}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid #ddd"}}
                  >
                    {user.isRole}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditUser(user._id)}
                      sx={{ marginRight: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-select": { backgroundColor: "#f4f4f4" },
          "& .MuiTablePagination-actions": { color: "#555" },
        }}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={error || (success ? "User deleted successfully" : "")}
        severity={error ? "error" : "success"}
      />
    </Box>
  );
};

export default ViewAllUsers;
