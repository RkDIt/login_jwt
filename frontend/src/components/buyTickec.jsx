import React, { useState } from "react";
import { Await, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Card,
  Divider,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { addOrder } from "../api/movieApi";
import localStorageUtil from "../utils/localStorage";

const BookingDetails = ({ showtime }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieName, price, movieId } = location.state || {};
  
  const [numTickets, setNumTickets] = useState(1);
  const [ticketType, setTicketType] = useState("m-ticket");
  const [donate, setDonate] = useState(false);
  
  const baseTotal = price * numTickets;
  const convenienceFee = Math.round(baseTotal * 0.17);
  const donationAmount = donate ? numTickets * 1 : 0;
  const amountPayable = baseTotal + convenienceFee + donationAmount;
  
  const handlePayNow = async () => {
    const userId = localStorageUtil.get("userId");

    const orderDetails = {
      userId,
      movieId,
      totalAmount: amountPayable,
      numTickets,
      ticketType,
      showtime,
    };

    try {
      const orderResponse = await addOrder(orderDetails);
      const transactionId = orderResponse.data._id;
      navigate("/receipt", { state: { transactionId, movieName } });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/movieInfo/${movieId}`);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Card
        sx={{
          maxWidth: "500px", // Increased width from 500px to 600px
          width: "90%", // Ensures responsiveness
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#FFFFFF",
          textAlign: "center",
        }}
      >
        {/* Booking Summary */}
        <Typography
          variant="h6"
          sx={{ color: "#D32F2F", fontWeight: "bold", mb: 2 }}
        >
          BOOKING SUMMARY
        </Typography>

        {/* Ticket Details */}
        <Box
          sx={{
            padding: "15px",
            borderRadius: "8px",
            textAlign: "left",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Box display="flex" alignItems="center">
            <ConfirmationNumberIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight="bold">
              {movieName || "Movie Name"}
            </Typography>
          </Box>

          {/* Ticket Selector */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Typography variant="body2">Tickets:</Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                background: "#F5F5F5",
                borderRadius: "20px",
                padding: "4px 12px",
              }}
            >
              <IconButton
                size="small"
                onClick={() => setNumTickets((prev) => Math.max(1, prev - 1))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body2" sx={{ mx: 2 }}>
                {numTickets}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setNumTickets((prev) => prev + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Ticket Price */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Typography variant="body2">Total Ticket Price</Typography>
            <Typography fontWeight="bold">
              <CurrencyRupeeIcon fontSize="small" /> {baseTotal.toFixed(2)}
            </Typography>
          </Box>

          {/* Convenience Fee */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Typography variant="body2">Convenience Fee</Typography>
            <Typography>
              <CurrencyRupeeIcon fontSize="small" /> {convenienceFee.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Donation Option */}
          <Box
            sx={{
              background: "#FFF3E0",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={donate}
                  onChange={() => setDonate(!donate)}
                />
              }
              label="Donate to BookAChange"
            />
            <Typography fontWeight="bold" color="secondary">
              <CurrencyRupeeIcon fontSize="small" /> {donationAmount}
            </Typography>
          </Box>

          {/* Amount Payable */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            sx={{
              fontWeight: "bold",
              background: "#FFF8E1",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <Typography>Amount Payable</Typography>
            <Typography>
              <CurrencyRupeeIcon fontSize="small" /> {amountPayable.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Select Ticket Type */}
        <Typography variant="body1" sx={{ mt: 3, fontWeight: "bold" }}>
          SELECT TICKET TYPE
        </Typography>
        <RadioGroup
          row
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <FormControlLabel
            value="m-ticket"
            control={<Radio />}
            label="M-Ticket"
          />
          <FormControlLabel
            value="box-office"
            control={<Radio />}
            label="Box Office Pickup"
          />
        </RadioGroup>

        {/* Buttons Row */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          {/* Pay Now Button */}
          <Button
            onClick={handlePayNow}
            variant="contained"
            sx={{
              background: "#D32F2F",
              color: "white",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "30px",
              fontWeight: "bold",
              flex: 1,
              mr: 1, // Margin between buttons
            }}
          >
            PAY NOW
            <CurrencyRupeeIcon sx={{ mx: 1 }} />
            {amountPayable.toFixed(2)}
            <ArrowForwardIosIcon
              sx={{ ml: 1, fontSize: "18px", color: "white" }}
            />
          </Button>

          {/* Cancel Button */}
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              color: "#D32F2F",
              borderColor: "#D32F2F",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "30px",
              fontWeight: "bold",
              flex: 0.5, // Make it smaller
            }}
          >
            CANCEL
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default BookingDetails;
