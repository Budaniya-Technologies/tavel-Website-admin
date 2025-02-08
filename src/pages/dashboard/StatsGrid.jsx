import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { apiGet } from "../../utils/http";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const apiUserURL = "apiAdmin/v1/utils/userList";
const apiPackageURL = "apiAdmin/v1/utils/packageList";

const StatsGrid = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPackages, setTotalPackages] = useState(0);

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalPackages();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await apiGet(apiUserURL);
      if (response?.data?.data) {
        setTotalUsers(response.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchTotalPackages = async () => {
    try {
      const response = await apiGet(apiPackageURL);
      if (response?.data?.data) {
        setTotalPackages(response.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching total packages:", error);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      bgColor: "#1D4ED8",
      textColor: "#ffffff",
      icon: <PeopleAltIcon fontSize="large" />,
    },
    {
      title: "Total Packages",
      value: totalPackages,
      bgColor: "#10B981",
      textColor: "#ffffff",
      icon: <InventoryIcon fontSize="large" />,
    },
    {
      title: "Blogs",
      value: "0",
      bgColor: "#EF4444",
      textColor: "#ffffff",
      icon: <ArticleIcon fontSize="large" />,
    },
    {
      title: "Orders",
      value: "0",
      bgColor: "#F59E0B",
      textColor: "#ffffff",
      icon: <ShoppingCartIcon fontSize="large" />,
    },
  ];

  return (
    <div className="flex justify-center items-center w-full mt-6">
      <Paper
        elevation={6}
        className="text-center rounded-lg shadow-lg w-full max-w-4xl p-6"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={4}
                className="rounded-lg flex items-center justify-between p-5"
                style={{
                  backgroundColor: stat.bgColor,
                  color: stat.textColor,
                  textAlign: "left",
                  minHeight: "120px",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "30px",
                }}
              >
                {/* Left Section (Icon + Text) */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center">{stat.icon}</div>
                  <div>
                    <Typography variant="h6" className="font-bold">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" className="font-extrabold">
                      {stat.value}
                    </Typography>
                  </div>
                  {/* Right Section (Image) */}
                {/* <div>
                  <img
                    src="https://users.zanithpay.com/assets/wallet-CkuQXZcj.png"
                    alt="Stat"
                    style={{ maxWidth: "80px", height: "auto"}}
                  />
                </div> */}
                </div>

                
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default StatsGrid;
