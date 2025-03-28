import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import RecList from "../components/RecList";
import { Box } from "@mui/material";

// Wireframe Loading Skeleton with Animation
const WireframeLoading = () => {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "white", p: 2 }}>
      
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Box sx={{ width: 150, height: 40, bgcolor: "grey.300", borderRadius: 1 }}></Box>
        </motion.div>
        
        <Box sx={{ display: "flex", gap: 2 }}>
          {[1, 2].map((_, index) => (
            <motion.div key={index} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.3 }}>
              <Box sx={{ width: 100, height: 40, bgcolor: "grey.300", borderRadius: 1 }}></Box>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Hero Banner */}
      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <Box sx={{ width: "100%", height: 500, bgcolor: "grey.300", mb: 4, borderRadius: 2 }}></Box>
      </motion.div>

      {/* Recommended Movies Section */}
      <Box>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Box sx={{ width: 200, height: 40, bgcolor: "grey.300", mb: 2, borderRadius: 1 }}></Box>
        </motion.div>
        
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", overflowX: "hidden" }}>
          {[1, 2, 3, 4].map((item, index) => (
            <motion.div key={item} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}>
              <Box sx={{ width: 200, height: 300, bgcolor: "grey.300", borderRadius: 2 }}></Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate data loading
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <WireframeLoading />
      </motion.div>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100vw", minHeight: "100vh", backgroundColor: "white" }}>
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 10, backgroundColor: "black" }}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Navbar />
        </motion.div>
      </Box>

      {/* Content with Animation */}
      <Box sx={{ pt: "80px" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          <Carousel />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
          <RecList />
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;
