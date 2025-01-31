import { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, CircularProgress, Paper, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Simulate fetching data from an API with dummy data
    fetchUsers();
  }, [page, rowsPerPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Use dummy data for now
      const dummyUsers = [
        { _id: 1, username: 'john_doe', email: 'john@example.com', phoneNumber: '1234567890', role: 'Admin' },
        { _id: 2, username: 'jane_smith', email: 'jane@example.com', phoneNumber: '9876543210', role: 'User' },
        { _id: 3, username: 'alice_jones', email: 'alice@example.com', phoneNumber: '5551234567', role: 'User' },
        { _id: 4, username: 'bob_martin', email: 'bob@example.com', phoneNumber: '5559876543', role: 'Admin' },
        { _id: 5, username: 'charlie_brown', email: 'charlie@example.com', phoneNumber: '5555647382', role: 'User' },
        // Add more dummy data as needed
      ];
      setUsers(dummyUsers.slice(page * rowsPerPage, (page + 1) * rowsPerPage));  // Pagination simulation
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userId) => {
    // Implement user editing functionality here
    console.log(`Editing user with ID: ${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Simulate delete operation with a console log
      console.log(`Deleting user with ID: ${userId}`);
      setSuccess(true);
      fetchUsers();
    } catch (err) {
      setError('An error occurred while deleting the user.');
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
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3, boxShadow: 3, marginTop: '100px' }}>
      <h2 style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'center', fontSize: '2rem', color: 'rgb(63, 81, 181)' }}>View All Users</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4', color: '#333' }}>#</TableCell> {/* Index Column */}
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4', color: '#333' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4', color: '#333' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4', color: '#333' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4', color: '#333' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f4f4f4', color: '#333' }}>Actions</TableCell>
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
                <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, borderBottom: '1px solid #ddd' }}>
                  <TableCell sx={{ color: '#555' }}>{index + 1}</TableCell> {/* Displaying index */}
                  <TableCell sx={{ color: '#555' }}>{user.username}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{user.email}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{user.phoneNumber}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{user.role}</TableCell>
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
          '& .MuiTablePagination-select': { backgroundColor: '#f4f4f4' },
          '& .MuiTablePagination-actions': { color: '#555' },
        }}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={error || (success ? 'User deleted successfully' : '')}
        severity={error ? 'error' : 'success'}
      />
    </Box>
  );
};

export default ViewAllUsers;
