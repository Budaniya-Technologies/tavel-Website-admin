import { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, IconButton, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiGet } from '../../../utils/http';

const getBlogsAPI = 'apiAdmin/v1/blog/getAllBlog';

const ViewAllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await apiGet(getBlogsAPI);
      if (response.data.statusCode === 200) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(`Editing blog with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting blog with ID: ${id}`);
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
      <h2 style={{ textAlign: 'center', color: '#3f51b5', fontWeight: 'bold', margin: '30px', fontSize: '2rem' }}>View All Blogs</h2>
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
        <Table sx={{ minWidth: 650, border: '1px solid #ddd' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f4f4' }}>
              {['#', 'Title', 'Image', 'Category', 'Status', 'Created At', 'Actions'].map((head) => (
                <TableCell key={head} sx={{ fontWeight: 'bold', border: '1px solid #ddd', textAlign: 'center' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No blogs found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((blog, index) => (
                <TableRow key={blog._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                  <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{blog.title}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                    <img src={blog.image} alt={blog.title} width={50} height={50} style={{ borderRadius: '5px' }} />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{blog.category}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center', color: blog.isStatus ? 'green' : 'red' }}>
                    {blog.isStatus ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>{new Date(blog.createdAt).toLocaleString()}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', textAlign: 'center' }}>
                    <IconButton color="primary" onClick={() => handleEdit(blog._id)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(blog._id)}><DeleteIcon /></IconButton>
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
        count={blogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ViewAllBlog;
