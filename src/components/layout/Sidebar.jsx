import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HikingIcon from "@mui/icons-material/Hiking";
import CommentIcon from '@mui/icons-material/Comment';
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArticleIcon from "@mui/icons-material/Article";
import { useTheme } from "@mui/material/styles";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import img from "../../assets/Images/thebagPacker-logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openUsers, setOpenUsers] = useState(false);
  const [openPackages, setOpenPackages] = useState(false);
  const [openBlogs, setOpenBlogs] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openHomeMain, setOpenHomeMain] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openPictures, setOpenPictures] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  const [openHiking, setOpenHiking] = useState(false);

  const handleNavigation = (path) => {
    if (!isOpen) {
      toggleSidebar(); // Open sidebar first
      setTimeout(() => navigate(path), 300);
    } else {
      navigate(path);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isOpen ? "260px" : "80px",
        transition: "width 0.3s ease",
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
        color: theme.palette.common.white,
        height: "100vh",
        marginTop: "50px",
        paddingTop: "20px",
        boxSizing: "border-box",
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar Toggle Button */}
      <IconButton
        onClick={toggleSidebar}
        style={{
          color: "white",
          marginLeft: isOpen ? "200px" : "20px",
          transition: "all 0.3s ease",
        }}
      >
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>

      {/* User Profile Section */}
      <div style={profileContainer}>
        <Avatar
          src={img}
          style={{
            width: isOpen ? "100px" : "40px",
            height: isOpen ? "100px" : "40px",
            transition: "all 0.3s ease",
          }}
        />
      </div>

      <div style={menuContainerStyle}>
        <div onClick={() => handleNavigation("/")} style={linkStyle}>
          <HomeIcon style={iconStyle} />
          {isOpen && <span>Dashboard</span>}
        </div>

        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenHomeMain(!openHomeMain);
          }}
          style={dropdownStyle}
        >
          <HomeIcon style={iconStyle} />
          {isOpen && <span>HomeMain</span>}
          {isOpen && (openHomeMain ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openHomeMain && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/homemain/view-all")}
              style={nestedLinkStyle}
            >
              View All HomeMain
            </li>
            {/* <li
              onClick={() => handleNavigation("/homemain/add")}
              style={nestedLinkStyle}
            >
              Add HomeMain
            </li> */}
          </ul>
        )}

        {/* Users Dropdown */}
        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenUsers(!openUsers);
          }}
          style={dropdownStyle}
        >
          <GroupIcon style={iconStyle} />
          {isOpen && <span>Users</span>}
          {isOpen && (openUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openUsers && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/users/view-all")}
              style={nestedLinkStyle}
            >
              View All Users
            </li>
            <li
              onClick={() => handleNavigation("/users/add")}
              style={nestedLinkStyle}
            >
              Add New User
            </li>
          </ul>
        )}

        {/* Packages Dropdown */}
        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenPackages(!openPackages);
          }}
          style={dropdownStyle}
        >
          <InventoryIcon style={iconStyle} />
          {isOpen && <span>Packages</span>}
          {isOpen && (openPackages ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openPackages && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/packages/view-all")}
              style={nestedLinkStyle}
            >
              View All Packages
            </li>
            <li
              onClick={() => handleNavigation("/packages/add")}
              style={nestedLinkStyle}
            >
              Add Package
            </li>
          </ul>
        )}

        {/* Blogs Dropdown */}
        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenBlogs(!openBlogs);
          }}
          style={dropdownStyle}
        >
          <ArticleIcon style={iconStyle} />
          {isOpen && <span>Blogs</span>}
          {isOpen && (openBlogs ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openBlogs && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/blogs/view-all")}
              style={nestedLinkStyle}
            >
              View All Blogs
            </li>
            <li
              onClick={() => handleNavigation("/blogs/add")}
              style={nestedLinkStyle}
            >
              Add Blog
            </li>
          </ul>
        )}

        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenCategory(!openCategory);
          }}
          style={dropdownStyle}
        >
          <CategoryIcon style={iconStyle} />{" "}
          {/* Replace with your preferred icon */}
          {isOpen && <span>Category</span>}
          {isOpen && (openCategory ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openCategory && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/category/view-all")}
              style={nestedLinkStyle}
            >
              View All Category
            </li>
            <li
              onClick={() => handleNavigation("/category/add")}
              style={nestedLinkStyle}
            >
              Add Category
            </li>
          </ul>
        )}

        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenHiking(!openHiking);
          }}
          style={dropdownStyle}
        >
          <HikingIcon style={iconStyle} /> {/* Replace with your hiking icon */}
          {isOpen && <span>Hiking</span>}
          {isOpen && (openHiking ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openHiking && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/hiking/view-all")}
              style={nestedLinkStyle}
            >
              View All Hiking
            </li>
            <li
              onClick={() => handleNavigation("/hiking/add")}
              style={nestedLinkStyle}
            >
              Add New Hiking
            </li>
          </ul>
        )}

        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenPictures(!openPictures);
          }}
          style={dropdownStyle}
        >
          <PhotoLibraryIcon style={iconStyle} />{" "}
          {/* Replace with your desired pictures icon */}
          {isOpen && <span>Trip Pictures</span>}
          {isOpen && (openPictures ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openPictures && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/pictures/view-all")}
              style={nestedLinkStyle}
            >
              View All Pictures
            </li>
            <li
              onClick={() => handleNavigation("/pictures/add")}
              style={nestedLinkStyle}
            >
              Add New Picture
            </li>
          </ul>
        )}

        {/* Reviews Dropdown */}
        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenReviews(!openReviews);
          }}
          style={dropdownStyle}
        >
          <CommentIcon style={iconStyle} />{" "}
          {/* Replace with your desired icon */}
          {isOpen && <span>Reviews</span>}
          {isOpen && (openReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {openReviews && isOpen && (
          <ul style={nestedListStyle}>
            <li
              onClick={() => handleNavigation("/reviews/view")}
              style={nestedLinkStyle}
            >
              View Reviews
            </li>
            <li
              onClick={() => handleNavigation("/reviews/add")}
              style={nestedLinkStyle}
            >
              Add Review
            </li>
          </ul>
        )}

        {/* Settings Dropdown */}
        <div
          onClick={() => {
            if (!isOpen) toggleSidebar();
            else setOpenSettings(!openSettings);
          }}
          style={dropdownStyle}
        >
          <SettingsIcon style={iconStyle} />
          {isOpen && <span>Settings</span>}
          {isOpen && (openSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </div>
        {/* {openSettings && isOpen && (
          <ul style={nestedListStyle}>
            <li onClick={() => handleNavigation("/settings/theme")} style={nestedLinkStyle}>
              Theme
            </li>
            <li onClick={() => handleNavigation("/settings/account")} style={nestedLinkStyle}>
              Account Settings
            </li>
            <li onClick={() => handleNavigation("/settings/notifications")} style={nestedLinkStyle}>
              Notifications
            </li>
          </ul>
        )} */}
      </div>
    </div>
  );
};

// Styles
const profileContainer = {
  display: "flex",
  alignItems: "start",
  paddingLeft: "30px",
  flexDirection: "column",
  paddingBottom: "15px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  // padding: "14px 20px",
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "5px",
  transition: "all 0.3s ease",
  marginBottom: "8px",
  cursor: "pointer",
};

const iconStyle = {
  marginRight: "15px",
  fontSize: "24px",
};

const dropdownStyle = {
  display: "flex",
  alignItems: "center",
  // padding: "14px 20px",
  color: "white",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "5px",
};

const nestedListStyle = {
  listStyleType: "none",
  paddingLeft: "35px",
  margin: 0,
  color: "#d1d1d1",
  paddingTop: "5px",
};

const nestedLinkStyle = {
  color: "#d1d1d1",
  textDecoration: "none",
  padding: "5px 0",
  display: "block",
  fontSize: "14px",
  fontWeight: "400",
};

const menuContainerStyle = {
  paddingLeft: "10px",
  paddingRight: "10px",
};

export default Sidebar;
