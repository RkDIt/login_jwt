import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { format, addDays } from "date-fns";

const theaters = [
  {
    name: "PVR: Elante, Chandigarh",
    timings: ["04:35 PM"],
    cancelable: true,
  },
  {
    name: "Cinepolis: Bestech Square, Mohali",
    timings: ["06:00 PM"],
    cancelable: false,
  },
  {
    name: "PVR: MOHALI WALK",
    timings: ["10:00 PM"],
    cancelable: true,
  },
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

const Showtimes = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const dates = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

  return (
    <Box className="max-w-4xl mx-auto p-4">
      {/* Date Selector */}
      <Box className="flex space-x-4 overflow-x-auto mb-6">
        {dates.map((date) => (
          <Button
            key={date}
            variant={format(date, "yyyy-MM-dd") === selectedDate ? "contained" : "outlined"}
            onClick={() => setSelectedDate(format(date, "yyyy-MM-dd"))}
          >
            <Typography className="font-bold">
              {format(date, "EEE dd MMM")} {/* Thu 13 Mar */}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Theater Listings */}
      <Box className="space-y-4">
        {theaters.map((theater, index) => (
          <Box key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <Typography variant="h6" className="font-bold">
              {theater.name}
            </Typography>
            <Box className="flex gap-3 mt-2">
              {theater.timings.map((time, i) => (
                <Button key={i} variant="contained" color="success">
                  {time}
                </Button>
              ))}
            </Box>
            <Typography className="text-gray-500 mt-1">
              {theater.cancelable ? "Cancellation available" : "Non-cancellable"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Showtimes;
