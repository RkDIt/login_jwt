import React, { useEffect, useState } from "react";
import { 
  Card, CardContent, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, Box, TextField, CircularProgress 
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import AdminSidePanel from "../../components/adminSidePan";
import { green, red } from "@mui/material/colors";
import { orders } from "../../api/movieApi";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orders();
      setOrderList(response);

      setUserNames((prevUserNames) => {
        const updatedUserNames = { ...prevUserNames };
        response.forEach((order) => {
          if (order.userId) {
            updatedUserNames[order.userId._id] = order.userId.name;
          }
        });
        return updatedUserNames;
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orderList.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orderList.length;

  const summaryData = [
    { title: "Total Revenue", value: `₹${totalRevenue}`, percentage: "4.7%", positive: true },
    { title: "Total Orders", value: totalOrders, percentage: "3.2%", positive: true },
  ];

  const filteredOrders = orderList.filter(order => {
    const userName = order.userId ? order.userId.name : userNames[order.userId?._id] || "Unknown";
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen">
      <AdminSidePanel />

      <div className="flex-1 p-6 flex flex-col">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {summaryData.map((item, index) => (
            <Card key={index} className="p-4 w-full shadow-lg rounded-lg border border-gray-200">
              <CardContent className="text-center">
                <Typography variant="h6" className="text-gray-700 font-semibold">{item.title}</Typography>
                <Typography variant="h4" className="font-bold text-blue-600">{item.value}</Typography>
                <Typography className={item.positive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {item.percentage} {item.positive ? "↑" : "↓"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Bar with Search and Refresh */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField 
            label="Search Users" 
            variant="outlined" 
            size="small" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <IconButton color="primary" onClick={fetchOrders} className="shadow-md border border-gray-300">
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* Loading Animation */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg shadow-lg">
            <TableContainer component={Paper} className="h-full">
              <Table>
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell className="font-bold text-gray-700">Transaction ID</TableCell>
                    <TableCell className="font-bold text-gray-700">Order</TableCell>
                    <TableCell className="font-bold text-gray-700">Date</TableCell>
                    <TableCell className="font-bold text-gray-700">Customer</TableCell>
                    <TableCell className="font-bold text-gray-700">Status</TableCell>
                    <TableCell className="font-bold text-gray-700">Payment</TableCell>
                    <TableCell className="font-bold text-gray-700">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => {
                    // Determine user status based on isActive property
                    const userStatus = order.userId && order.userId.isActive 
                      ? "Active" 
                      : "Inactive";

                    const displayUserName = order.userId 
                      ? order.userId.name 
                      : userNames[order.userId?._id] || "Unknown";
                    
                    // Handle movie title
                    const displayMovieTitle = order.movieId && order.movieId.title 
                      ? order.movieId.title 
                      : "Movie doesn't exist anymore";

                    return (
                      <TableRow key={order._id} className="hover:bg-gray-50">
                        <TableCell>{order._id}</TableCell>
                        <TableCell>
                          <span className={!order.movieId || !order.movieId.title ? "text-red-500" : ""}>
                            {displayMovieTitle}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{displayUserName}</TableCell>
                        <TableCell>
                          <span 
                            className="px-3 py-1 rounded-full text-white text-sm font-medium"
                            style={{ 
                              backgroundColor: userStatus === "Active" 
                                ? green[500] 
                                : red[500] 
                            }}
                          >
                            {userStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span 
                            className="px-3 py-1 rounded-full text-white text-sm font-medium" 
                            style={{ backgroundColor: order.paymentStatus === "completed" ? green[500] : "gray" }}
                          >
                            {order.paymentStatus}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">₹{order.totalAmount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;