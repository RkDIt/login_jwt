import React, { useState, useEffect } from "react";
import { getAllUsers, editUser, deleteUser } from "../api/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";

const roleLabels = {
  user: "User",
  subadmin: "Admin",
};

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [originalData, setOriginalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0); // 0 for Active, 1 for Inactive

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = () => {
    if (!selectedUser) return;
    const user = users.find((user) => user._id === selectedUser);
    if (user) {
      setEditData({ name: user.name, email: user.email, role: user.role });
      setOriginalData({ name: user.name, email: user.email, role: user.role });
      setIsEditing(true);
    }
  };

  const handleEdit = async () => {
    if (
      !selectedUser ||
      JSON.stringify(editData) === JSON.stringify(originalData)
    )
      return;

    try {
      await editUser(selectedUser, editData);
      setUsers(
        users.map((user) =>
          user._id === selectedUser ? { ...user, ...editData } : user
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);

      if (
        error.response &&
        error.response.data.message === "Email already exists"
      ) {
        alert("This email is already in use. Please use a different email.");
        setEditData((prev) => ({ ...prev, email: originalData.email }));
      } else {
        alert("An error occurred while updating the user. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(originalData);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      // Only for active users - deactivate them
      await deleteUser(selectedUser);
      
      // Update local state to reflect the change
      setUsers(
        users.map((user) =>
          user._id === selectedUser ? { ...user, isActive: false } : user
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedUser(null);
    setIsEditing(false);
  };

  const hasChanges = JSON.stringify(editData) !== JSON.stringify(originalData);

  // Filter users based on search term and exclude admins
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      user.role !== "admin" // Exclude admins from the list
  );

  // Explicitly filter users by isActive field
  const activeUsers = filteredUsers.filter((user) => user.isActive === true);
  const inactiveUsers = filteredUsers.filter((user) => user.isActive === false);

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          Manage Users
        </Typography>

        {/* Search Input */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: "4px" }}
        />

        {/* Only show action buttons on Active tab */}
        {activeTab === 0 && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!hasChanges}
                  onClick={handleEdit}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!selectedUser}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disabled={!selectedUser}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      {/* Tabs for Active/Inactive Users */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
        >
          <Tab
            label={`Active Users (${activeUsers.length})`}
            sx={{ fontWeight: "bold" }}
          />
          <Tab
            label={`Inactive Users (${inactiveUsers.length})`}
            sx={{ fontWeight: "bold" }}
          />
        </Tabs>
      </Box>

      {/* Table - Different for Active vs Inactive */}
      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {activeTab === 0 ? (
          /* Active Users Table - With full functionality */
          <Table>
            <TableHead>
              <TableRow sx={{ background: "rgba(255, 255, 255, 0.4)" }}>
                <TableCell align="center">Select</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeUsers.length > 0 ? (
                activeUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    onClick={() => !isEditing && setSelectedUser(user._id)}
                    sx={{
                      cursor: isEditing ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease-in-out",
                      background:
                        selectedUser === user._id
                          ? "rgba(0, 123, 255, 0.2)"
                          : "transparent",
                      "&:hover": {
                        background: isEditing
                          ? "transparent"
                          : "rgba(0, 123, 255, 0.1)",
                        boxShadow:
                          selectedUser === user._id
                            ? "0px 0px 8px rgba(0, 123, 255, 0.5)"
                            : "none",
                      },
                    }}
                  >
                    <TableCell align="center">
                      <Radio
                        checked={selectedUser === user._id}
                        onChange={() => !isEditing && setSelectedUser(user._id)}
                        color="primary"
                        disabled={isEditing}
                      />
                    </TableCell>
                    <TableCell>
                      {isEditing && selectedUser === user._id ? (
                        <TextField
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ backgroundColor: "white", borderRadius: "4px" }}
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing && selectedUser === user._id ? (
                        <TextField
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ backgroundColor: "white", borderRadius: "4px" }}
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing && selectedUser === user._id ? (
                        <Select
                          value={editData.role}
                          onChange={(e) =>
                            setEditData({ ...editData, role: e.target.value })
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ backgroundColor: "white", borderRadius: "4px" }}
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="subadmin">Admin</MenuItem>
                        </Select>
                      ) : (
                        roleLabels[user.role] || user.role
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor: "#4caf50",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No active users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          /* Inactive Users Table - Simplified with just name, email, status */
          <Table>
            <TableHead>
              <TableRow sx={{ background: "rgba(255, 255, 255, 0.4)" }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inactiveUsers.length > 0 ? (
                inactiveUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        Inactive
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No inactive users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default AdminUserTable;