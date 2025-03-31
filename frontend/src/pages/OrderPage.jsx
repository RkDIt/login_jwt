import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { userOrders } from "../api/movieApi";
import localStorageUtil from "../utils/localStorage";
import { 
  CircularProgress, 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Skeleton 
} from "@mui/material";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOrders = async () => {
      try {
        const userId = localStorageUtil.get("userId");
        const ordersData = await userOrders(userId);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleBuyTickets = () => {
    navigate('/movies');
  };

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh" 
          bgcolor="background.default"
        >
          <CircularProgress size={60} />
        </Box>
      </Box>
    );
  }

  if (orders.length === 0) {
  return (
    <Box>
      <Navbar />
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
        overflow="hidden"
        bgcolor="background.default"
        textAlign="center"
        p={3}
      >
        <Typography variant="h4" gutterBottom>
          No Orders Yet
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          You haven't booked any tickets yet.
        </Typography>
        {/* <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBuyTickets}
          sx={{ mt: 2 }}
        >
          Buy Tickets Now
        </Button> */}
      </Box>
    </Box>
  );
}

  return (
    <div>
      <Navbar />
      <div id="webcrumbs">
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden relative ">
            {orders.reverse().map((order) => {
              // Skip rendering if movieId is undefined
              if (!order.movieId) return null;
              
              return (
                <div key={order._id} className="mb-8">
                  <div className="relative border-2 border-dashed border-gray-500">
                    <div className="absolute top-0 left-0 w-6 h-6 bg-gray-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 bg-gray-100 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-7">
                      <div className="w-1/4">
                        <div className="bg-white p-2 border border-gray-300 rounded-md">
                          <img
                            src={order.movieId.poster_path || "https://via.placeholder.com/150"}
                            alt={order.movieId.title}
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                      </div>
                      <div className="w-3/4">
                        <h2 className="font-bold text-3xl">{order.movieId.title} (U/A)</h2>
                        <div className="flex flex-col gap-6">
                          <p className="text-xl text-gray-600 mt-3">
                            {new Date(order.createdAt).toLocaleDateString()} | {order.showtime.time}
                          </p>
                        </div>
                        <p className="text-xl text-gray-600">Hindi, 2D</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <p className="text-lg font-semibold">{order.numTickets} Ticket(s)</p>
                      <div className="text-sm text-gray-500 flex flex-col items-end">
                        <span>{order.ticketType === "m-ticket" ? "E-ticket" : "Physical Ticket"}</span>
                      </div>
                    </div>
                    <div className="text-xl text-gray-600 mt-2 border-t border-dashed pt-2">
                      <p className="text-2xl text-gray-600">{order.showtime.theater}</p>
                      <p>BOOKING ID: {order._id}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-6">
                      A confirmation is sent on e-mail/SMS/WhatsApp within 15 minutes of booking.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;