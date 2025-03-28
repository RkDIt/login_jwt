import React, { useEffect, useState } from "react"; 
import { motion } from "framer-motion"; 
import Navbar from "../components/Navbar"; 
import Carousel from "../components/Carousel"; 
import RecList from "../components/RecList"; 
import { Box } from "@mui/material";  

const WireframeLoading = () => {   
  return (     
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "white", p: 2 }}>       
      {/* Header */}       
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>         
        <Box sx={{ width: 150, height: 40, bgcolor: "grey.300" }}></Box>         
        <Box sx={{ display: "flex", gap: 2 }}>           
          <Box sx={{ width: 100, height: 40, bgcolor: "grey.300" }}></Box>           
          <Box sx={{ width: 100, height: 40, bgcolor: "grey.300" }}></Box>         
        </Box>       
      </Box>        
      {/* Hero Banner */}       
      <Box sx={{         
        width: "100%",         
        height: 500,         
        bgcolor: "grey.300",         
        mb: 4,         
        borderRadius: 2       
      }}></Box>        
      {/* Recommended Movies Section */}       
      <Box>         
        <Box sx={{ width: 200, height: 40, bgcolor: "grey.300", mb: 2 }}></Box>         
        <Box sx={{ display: "flex", gap: 2, justifyContent:"center",alignItems:"center",overflowX: "hidden" }}>           
          {[1, 2, 3, 4].map((item) => (             
            <Box               
              key={item}               
              sx={{                 
                width: 200,                 
                height: 300,                 
                bgcolor: "grey.300",                 
                borderRadius: 2               
              }}             
            ></Box>           
          ))}         
        </Box>       
      </Box>     
    </Box>   
  ); 
};  

const Dashboard = () => {   
  const [isLoading, setIsLoading] = useState(true);   
  const [firstLoad, setFirstLoad] = useState(false);    

  useEffect(() => {     
    // Show wireframe only once when app starts
    const hasSeenWireframe = sessionStorage.getItem("wireframeShown");
    
    const loadData = async () => {       
      try {         
        // Simulated async data loading for 3 seconds         
        await new Promise(resolve => setTimeout(resolve, 1000));         
        setIsLoading(false);          
        
        if (!hasSeenWireframe) {
          setFirstLoad(true);
          sessionStorage.setItem("wireframeShown", "true");
        }
      } catch (error) {         
        console.error("Error loading dashboard data:", error);         
        setIsLoading(false);       
      }     
    };      

    loadData();   
  }, []);    

  if (isLoading && !sessionStorage.getItem("wireframeShown")) {     
    return (       
      <motion.div         
        initial={{ opacity: 0 }}         
        animate={{ opacity: 1 }}         
        transition={{ duration: 0.5 }}       
      >         
        <WireframeLoading />       
      </motion.div>     
    );   
  }    

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
      <Box sx={{ pt: "80px" }}>         
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