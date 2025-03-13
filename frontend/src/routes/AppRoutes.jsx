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
import MovieInfo from "../pages/MovieInfo.jsx";
import BookingPage from "../pages/BookingPage.jsx";

const isAuthenticated = () => !!localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("role");

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/signup" 
        element={isAuthenticated() ? (getUserRole() === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) : <SignUp />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated() ? (getUserRole() === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />) : <Login />} 
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* User Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/movieInfo/:id" element={<MovieInfo />} />
        
        {/* Booking is only accessible through a specific movie */}
        <Route path="/booking/:movieId" element={<BookingPage />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<UserManage />} />
      </Route>

      {/* Redirect all unknown routes */}
      <Route path="*" element={<Navigate to={isAuthenticated() ? (getUserRole() === "admin" ? "/admin" : "/dashboard") : "/signup"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
