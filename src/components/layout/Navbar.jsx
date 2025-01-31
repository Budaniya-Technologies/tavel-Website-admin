import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ toggleSidebar, isAuthenticated, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function passed as a prop
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(to right, #4e54c8, #8f94fb)', 
        height: '100px', 
      }}
    >
      <Toolbar sx={{ height: '100%' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar} 
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <div>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          ) : (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/settings">Settings</Link></MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
