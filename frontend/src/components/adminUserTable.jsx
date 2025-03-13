import React, { useState, useEffect } from "react";
import { getAllUsers, editUser, deleteUser } from "../api/userApi";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Radio, Button, Typography, Box, TextField, Select, MenuItem
} from "@mui/material";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "", role: "user" });
  const [originalData, setOriginalData] = useState({});

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
    const user = users.find(user => user._id === selectedUser);
    if (user) {
      setEditData({ name: user.name, email: user.email, role: user.role });
      setOriginalData({ name: user.name, email: user.email, role: user.role });
      setIsEditing(true);
    }
  };

  const handleEdit = async () => {
    if (!selectedUser || JSON.stringify(editData) === JSON.stringify(originalData)) return;
  
    try {
      await editUser(selectedUser, editData);
      setUsers(users.map(user => (user._id === selectedUser ? { ...user, ...editData } : user)));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
  
      // Check if error response exists and contains the "email already exists" message
      if (error.response && error.response.data.message === "Email already exists") {
        alert("This email is already in use. Please use a different email.");
        
        // Revert email input back to its original value
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
      await deleteUser(selectedUser);
      setUsers(users.filter(user => user._id !== selectedUser));
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const hasChanges = JSON.stringify(editData) !== JSON.stringify(originalData);

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          Manage Users
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isEditing ? (
            <>
              <Button variant="contained" color="success" disabled={!hasChanges} onClick={handleEdit}>
                Save
              </Button>
              <Button variant="contained" color="inherit" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="primary" disabled={!selectedUser} onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="contained" color="error" disabled={!selectedUser} onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "rgba(255, 255, 255, 0.4)" }}>
              <TableCell align="center">Select</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                onClick={() => !isEditing && setSelectedUser(user._id)}
                sx={{
                  cursor: isEditing ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease-in-out",
                  background: selectedUser === user._id ? "rgba(0, 123, 255, 0.2)" : "transparent",
                  "&:hover": {
                    background: isEditing ? "transparent" : "rgba(0, 123, 255, 0.1)",
                    boxShadow: selectedUser === user._id ? "0px 0px 8px rgba(0, 123, 255, 0.5)" : "none"
                  }
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
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
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
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
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
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white", borderRadius: "4px" }}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUserTable;
