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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/signup" replace />} />
      {/* <Route path="/" element={<SignUp />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
