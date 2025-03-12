import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import RecList from "../../components/RecList";

const Dashboard = () => {
  return (
    <>
      {/* Navbar with fade-in and slide-down effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <Navbar />
      </motion.div>

      {/* Carousel with fade-in effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.5 }}
      >
        <Carousel />
      </motion.div>

      <RecList />
    </>
  );
};

export default Dashboard;
