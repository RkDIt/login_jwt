import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Receipt from "../components/Receipt.jsx"
import AddMovies from "../pages/AdminPages/AddMovies.jsx";


const isAuthenticated = () => !!localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("role");

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/signup"
        element={
          isAuthenticated() ? (
            getUserRole() === "admin" || getUserRole() === "subadmin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <SignUp />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            getUserRole() === "admin" || getUserRole() === "subadmin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* User Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/movieInfo/:id" element={<MovieInfo />} />
        <Route path="/booking/:movieId" element={<BookingPage />} />
        <Route path="/receipt" element={<Receipt/>} />
        
      </Route>

      {/* Admin & Subadmin Protected Routes */}
      <Route element={<PrivateRoute allowedRoles={["admin", "subadmin"]} />}>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/movies" element={<AddMovies/>} />

        <Route path="/admin/users" element={<UserManage />} />
      </Route>

      {/* Redirect all unknown routes */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            getUserRole() === "admin" || getUserRole() === "subadmin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <Navigate to="/signup" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
