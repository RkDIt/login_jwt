import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import RecList from "../components/RecList";
import { Box } from "@mui/material";

const Dashboard = () => {
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("dashboardLoaded")) {
      setFirstLoad(true);
      sessionStorage.setItem("dashboardLoaded", "true");
    }
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100vw", minHeight: "100vh", backgroundColor: "white" }}>
    
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 10, backgroundColor: "black" }}>
        {firstLoad ? (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <Navbar />
          </motion.div>
        ) : (
          <Navbar />
        )}
      </Box>

      {/* Content below navbar */}
      <Box sx={{ pt: "80px" }}> {/* Add padding to avoid content being hidden */}
        {firstLoad ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeIn", delay: 0.5 }}
          >
            <Carousel />
          </motion.div>
        ) : (
          <Carousel />
        )}

        <RecList />
      </Box>
    </Box>
  );
};

export default Dashboard;
