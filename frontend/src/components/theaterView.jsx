import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { format, addDays, parse } from "date-fns";

// Full list of available theaters
const allTheaters = [
  { name: "PVR: Elante, Chandigarh", timings: ["04:35 PM"], cancelable: true },
  {
    name: "Cinepolis: Bestech Square, Mohali",
    timings: ["06:00 PM"],
    cancelable: false,
  },
  { name: "PVR: MOHALI WALK", timings: ["10:00 PM"], cancelable: true },
  {
    name: "Rajhans Cinemas: Panchkula",
    timings: ["09:00 PM"],
    cancelable: false,
  },
  {
    name: "PVR: Centra, Chandigarh",
    timings: ["01:05 PM", "07:35 PM"],
    cancelable: true,
  },
];

// Generate a unique random subset of theaters for each date
const getRandomTheaters = () => {
  const count = Math.floor(Math.random() * allTheaters.length) + 1; // Choose between 1 and all theaters
  return allTheaters.sort(() => 0.5 - Math.random()).slice(0, count); // Random selection
};

const Showtimes = ({ onShowtimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [dateTheaterMap, setDateTheaterMap] = useState({});
  const currentTime = format(new Date(), "hh:mm a"); // Current real-time in AM/PM format

  const dates = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    const newTheaterMap = {};
    dates.forEach((date) => {
      newTheaterMap[format(date, "yyyy-MM-dd")] = getRandomTheaters();
    });
    setDateTheaterMap(newTheaterMap);
  }, []);

  return (
    <Box style={{ maxWidth: "650px", margin: "auto", padding: "20px" }}>
      {/* Back Button */}
      <Button
        onClick={() => window.history.back()}
        startIcon={<ArrowBackIcon />}
        style={{
          marginBottom: "15px",
          backgroundColor: "#EC4D56",
          color: "white",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "8px",
        }}
      >
        Back
      </Button>

      {/* Date Selector */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {dates.map((date, index) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const isSelected = dateStr === selectedDate;
          const isDisabled = index >= 3; // Disable selection beyond 3rd date

          return (
            <Button
              key={dateStr}
              onClick={() => !isDisabled && setSelectedDate(dateStr)}
              disabled={isDisabled}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "55px",
                height: "75px",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: isSelected ? "#EC4D56" : "transparent",
                color: isSelected ? "white" : isDisabled ? "gray" : "black",
                transition: "background-color 0.2s ease-in-out",
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              <Typography
                variant="caption"
                style={{
                  fontWeight: "bold",
                  color: isDisabled ? "gray" : isSelected ? "white" : "gray",
                }}
              >
                {format(date, "EEE")}
              </Typography>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                {format(date, "dd")}
              </Typography>
              <Typography
                variant="caption"
                style={{
                  color: isDisabled ? "gray" : isSelected ? "white" : "gray",
                }}
              >
                {format(date, "MMM")}
              </Typography>
            </Button>
          );
        })}
      </Box>

      {/* Theater Listings */}
      <Box>
        {dateTheaterMap[selectedDate]?.map((theater, index) => (
          <Box
            key={index}
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
              marginBottom: "10px",
              backgroundColor: "white",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {theater.name}
              </Typography>
              <InfoOutlinedIcon style={{ color: "gray" }} />
            </Box>

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginTop: "5px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "green",
                  fontSize: "14px",
                }}
              >
                <SmartphoneIcon fontSize="small" />
                <Typography variant="body2">M-Ticket</Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#f57c00",
                  fontSize: "14px",
                }}
              >
                <FastfoodIcon fontSize="small" />
                <Typography variant="body2">Food & Beverage</Typography>
              </Box>
            </Box>

            <Box style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {theater.timings.map((time, i) => {
                const isPastTime =
                  parse(time, "hh:mm a", new Date()) < new Date();
                return (
                  <Button
                    key={i}
                    variant="outlined"
                    disabled={isPastTime}
                    onClick={() =>
                      !isPastTime &&
                      onShowtimeSelect({ theater: theater.name, time })
                    }
                    style={{
                      borderColor: isPastTime ? "gray" : "#2E7D32",
                      color: isPastTime ? "gray" : "#2E7D32",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      opacity: isPastTime ? 0.5 : 1,
                    }}
                  >
                    {time}
                  </Button>
                );
              })}
            </Box>

            <Typography style={{ color: "gray", marginTop: "5px" }}>
              {theater.cancelable
                ? "Cancellation available"
                : "Non-cancellable"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Showtimes;
