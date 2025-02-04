import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ReceiptIcon from '@mui/icons-material/Receipt';
import ArticleIcon from '@mui/icons-material/Article'; 
import { useTheme } from '@mui/material/styles';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const [openUsers, setOpenUsers] = useState(false);
  const [openPackages, setOpenPackages] = useState(false);
  const [openBlogs, setOpenBlogs] = useState(false); 
  // const [openOrders, setOpenOrders] = useState(false); 
  const [openSettings, setOpenSettings] = useState(false); 

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isOpen ? '260px' : '80px',
        transition: 'width 0.3s ease',
        background: 'linear-gradient(to right, #4e54c8, #8f94fb)', 
        color: theme.palette.common.white,
        height: '100vh',
        marginTop: '50px',
        paddingTop: '20px',
        boxSizing: 'border-box',
        zIndex: 1000,
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)',
        overflowX: 'hidden',
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        style={{
          color: 'white',
          marginLeft: isOpen ? '200px' : '20px',
          transition: 'all 0.3s ease',
        }}
      >
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>

      <div style={menuContainerStyle}>
        <Link to="/" style={linkStyle}>
          <HomeIcon style={iconStyle} />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <div onClick={() => setOpenUsers(!openUsers)} style={dropdownStyle}>
          <GroupIcon style={iconStyle} />
          {isOpen && <span>Users</span>}
          {isOpen && (openUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>

        {openUsers && isOpen && (
          <ul style={nestedListStyle}>
            <li>
              <Link to="/users/view-all" style={nestedLinkStyle}>View All Users</Link>
            </li>
            <li>
              <Link to="/users/add" style={nestedLinkStyle}>Add New User</Link>
            </li>
          </ul>
        )}

        <div onClick={() => setOpenPackages(!openPackages)} style={dropdownStyle}>
          <InventoryIcon style={iconStyle} />
          {isOpen && <span>Packages</span>}
          {isOpen && (openPackages ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>

        {openPackages && isOpen && (
          <ul style={nestedListStyle}>
            <li>
              <Link to="/packages/view-all" style={nestedLinkStyle}>View All Packages</Link>
            </li>
            <li>
              <Link to="/packages/add" style={nestedLinkStyle}>Add Package</Link>
            </li>
          </ul>
        )}

         {/* Blogs Section */}
         <div onClick={() => setOpenBlogs(!openBlogs)} style={dropdownStyle}>
          <ArticleIcon style={iconStyle} />
          {isOpen && <span>Blogs</span>}
          {isOpen && (openBlogs ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openBlogs && isOpen && (
          <ul style={nestedListStyle}>
            <li>
              <Link to="/blogs/view-all" style={nestedLinkStyle}>View All Blogs</Link>
            </li>
            <li>
              <Link to="/blogs/add" style={nestedLinkStyle}>Add Blog</Link>
            </li>
          </ul>
        )}

        {/* <div onClick={() => setOpenOrders(!openOrders)} style={dropdownStyle}>
          <ReceiptIcon style={iconStyle} />
          {isOpen && <span>Orders</span>}
          {isOpen && (openOrders ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>

        {openOrders && isOpen && (
          <ul style={nestedListStyle}>
            <li>
              <Link to="/orders/view-all" style={nestedLinkStyle}>View All Orders</Link>
            </li>
            <li>
              <Link to="/orders/add" style={nestedLinkStyle}>Add Order</Link>
            </li>
          </ul>
        )} */}

        <div onClick={() => setOpenSettings(!openSettings)} style={dropdownStyle}>
          <SettingsIcon style={iconStyle} />
          {isOpen && <span>Settings</span>}
          {isOpen && (openSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>

        {openSettings && isOpen && (
          <ul style={nestedListStyle}>
            <li>
              <Link to="/settings/theme" style={nestedLinkStyle}>Theme</Link> 
            </li>
            <li>
              <Link to="/settings/account" style={nestedLinkStyle}>Account Settings</Link> 
            </li>
            <li>
              <Link to="/settings/notifications" style={nestedLinkStyle}>Notifications</Link> 
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '14px 20px',
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
  marginBottom: '8px',
  cursor: 'pointer',
  backgroundColor: 'transparent',  
};

const iconStyle = {
  marginRight: '15px',
  fontSize: '24px',
};

const dropdownStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '14px 20px',
  color: 'white',
  fontSize: '16px',
  fontWeight: '500',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  marginBottom: '5px',
  backgroundColor: 'transparent',  
};

const nestedListStyle = {
  listStyleType: 'none',
  paddingLeft: '35px',
  margin: 0,
  color: '#d1d1d1',
  paddingTop: '5px',
};

const nestedLinkStyle = {
  color: '#d1d1d1',
  textDecoration: 'none',
  padding: '10px 0',
  display: 'block',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
  fontSize: '14px',  // Updated font size for nested items
  fontWeight: '400',
  lineHeight: '1.6', // Adjusted line height for better readability
};

nestedLinkStyle[':hover'] = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: '#fff',
  paddingLeft: '15px',  // Slight indentation on hover for better visual feedback
};

const menuContainerStyle = {
  paddingLeft: '10px',
  paddingRight: '10px',
};

linkStyle[':hover'] = dropdownStyle[':hover'] = nestedLinkStyle[':hover'] = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: '#fff',
};

export default Sidebar;
