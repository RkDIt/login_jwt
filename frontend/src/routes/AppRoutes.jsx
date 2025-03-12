import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes.jsx";
import SignUp from "../pages/SignUp.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AdminPanel from "../pages/AdminPages/AdminPanel.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import Profile from "../pages/Profile.jsx";
import Logout from "../pages/Logout.jsx";
import UserManage from "../pages/AdminPages/UserManage.jsx";

const isAuthenticated = () => !!localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("role"); // Fetch role from localStorage

const AppRoutes = () => {
  return (
    <Routes>
      {/* Prevent logged-in users from accessing login/signup manually */}
      <Route 
        path="/signup" 
        element={isAuthenticated() ? (getUserRole() === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) : <SignUp />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated() ? (getUserRole() === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) : <Login />} 
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* User Routes (Only users can access) */}
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Admin Routes (Only admins can access) */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<UserManage/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Redirect users based on role */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            getUserRole() === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/signup" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
