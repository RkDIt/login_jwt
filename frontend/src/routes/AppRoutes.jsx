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
import Profile from  "../pages/Profile.jsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/signup" replace />} />
      {/* <Route path="/" element={<SignUp />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element = {<Profile/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
