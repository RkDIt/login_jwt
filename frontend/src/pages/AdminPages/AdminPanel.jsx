import React, { useEffect, useState } from "react";
import AdminSidePanel from "../../components/adminSidePan";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  People as UsersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { getUserDetails } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [userName, setUserName] = useState("Admin");
  const navigate = useNavigate();

  // Simulate fetching user data (replace with actual API call)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserDetails();
        setUserName(response.data.name)
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Side Panel */}
      <AdminSidePanel />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            Welcome, {userName}!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here's what's happening in your dashboard today.
          </Typography>
        </Box>

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          {/* Users Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", borderRadius: "10px", boxShadow: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <UsersIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Users
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  Manage and view all users in the system.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate("/admin/users")}
                >
                  Go to Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Analytics Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", borderRadius: "10px", boxShadow: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <AnalyticsIcon sx={{ fontSize: 40, color: "#4caf50" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Analytics
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  View system analytics and reports.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => navigate("/revenue")}
                >
                  Go to Analytics
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Settings Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", borderRadius: "10px", boxShadow: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <SettingsIcon sx={{ fontSize: 40, color: "#f57c00" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Settings
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  Manage Movies Database
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => navigate("/movies")}
                >
                  Manage Movies
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPanel;
