import React from "react";
import { Box, Typography, Button } from "@mui/material";

const BookingDetails = ({ showtime, goBack }) => {
    const {time,theater} = showtime
    console.log(time,theater)
  return (
    <Box style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>Booking Details</Typography>
      <Typography variant="h6">Theater: {showtime.theater}</Typography>
      <Typography variant="h6">Showtime: {showtime.time}</Typography>

      <Button onClick={goBack} variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Go Back
      </Button>
    </Box>
  );
};

export default BookingDetails;
