import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorageUtil from "../utils/localStorage";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorageUtil.remove("token");
    localStorageUtil.remove("role");

    // Refresh the page
    window.location.reload();

    // Redirect to login after a short delay (not needed, but can ensure proper redirection)
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
