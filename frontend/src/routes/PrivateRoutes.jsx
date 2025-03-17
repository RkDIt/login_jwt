import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "../api/userApi"; 

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getUserDetails()
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;  

  if (!token || !user) return <Navigate to="/login" replace />;

  // Redirect users and admins/subadmins properly
  if (user.data.role === "user" && !allowedRoles.includes("user")) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if ((user.data.role === "admin" || user.data.role === "subadmin") && !allowedRoles.includes(user.data.role)) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
