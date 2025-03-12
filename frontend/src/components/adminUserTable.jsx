import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Radio, Button, Typography, Box
} from "@mui/material";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1F2937" }}>
          Manage Users
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!selectedUser}
            onClick={() => alert(`Editing user ID: ${selectedUser}`)}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            disabled={!selectedUser}
            onClick={handleDelete}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>

      {/* Glassmorphism Table */}
      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "rgba(0, 0, 0, 0.05)" }}>
              <TableCell align="center" sx={{ fontSize: "18px", fontWeight: "bold", color: "#374151" }}>
                Select
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", color: "#374151" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", color: "#374151" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", color: "#374151" }}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                onClick={() => setSelectedUser(user._id)}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  background: selectedUser === user._id ? "rgba(33, 150, 243, 0.15)" : "transparent",
                  "&:hover": {
                    background: "rgba(33, 150, 243, 0.1)",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
                  }
                }}
              >
                <TableCell align="center">
                  <Radio
                    checked={selectedUser === user._id}
                    onChange={() => setSelectedUser(user._id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>{user.name}</TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUserTable;
