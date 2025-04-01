import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorageUtil from "../utils/localStorage";
import { CircularProgress } from "@mui/material"; // Import Material UI spinner

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorageUtil.remove("token");
    localStorageUtil.remove("role");

    // Refresh the page
    
    // Redirect to login after a short delay
    setTimeout(() => {
      // window.location.reload();
      navigate("/", { replace: true });
    }, 3000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress size={50} color="primary" />
      <p className="ml-3 text-lg text-gray-600">Logging out...</p>
    </div>
  );
};

export default Logout;
