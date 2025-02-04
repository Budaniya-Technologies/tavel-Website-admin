import { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, IconButton, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiGet } from '../../../utils/http';

const getPackagesAPI = 'apiAdmin/v1/package/getAllPackage';

const ViewAllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchPackages();
  }, [page, rowsPerPage]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await apiGet(getPackagesAPI);
      setPackages(response.data.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(`Editing package with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting package with ID: ${id}`);
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
      <h2 style={{ textAlign: 'center', color: 'rgb(63, 81, 181)', fontWeight: 'bold', margin: '30px', fontSize: '2rem' }}>View All Packages</h2>
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
        <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f4f4' }}>
              {['#', 'Title', 'Image', 'Price', 'Duration', 'Pick-Up', 'Drop', 'Slug', 'Status', 'Created At', 'Actions'].map((head) => (
                <TableCell key={head} sx={{ fontWeight: 'bold', border: '1px solid #ddd', textAlign: 'center' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={14} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} align="center">
                  No packages found.
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg, index) => (
                <TableRow key={pkg._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                  <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.title}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                    <img src={pkg.image} alt={pkg.title} width={50} height={50} style={{ borderRadius: '5px' }} />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.price}/-</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.duration}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.pickUpPoint}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.dropPoint}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.slug}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{pkg.isStatus ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{new Date(pkg.createdAt).toLocaleString()}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                    <IconButton color="primary" onClick={() => handleEdit(pkg._id)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(pkg._id)}><DeleteIcon /></IconButton>
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
        count={packages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ViewAllPackages;
