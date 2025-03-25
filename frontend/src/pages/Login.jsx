import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {API} from "../utils/Api.jsx"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must have at least one uppercase letter")
      .matches(/[a-z]/, "Password must have at least one lowercase letter")
      .matches(/\d/, "Password must have at least one number")
      .matches(/[@$!%*?&]/, "Password must have at least one special character")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      // console.log("Logging in with:", values);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}${API.LOGIN}`,
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const token = response.data.data.token;
        
        // console.log("Login  successful :  ", response.data);

        axios.defaults.headers.common["Authorization"] = `Bearer  ${token}`;
        if (response.status === 200) {
          localStorage.setItem("token", token);
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/dashboard");
        }

        return token;
      } catch (error) {
        // console.log("Login failed: ", error);
        if (error.response?.status === 401) {
          toast.error("Invalid email or password. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(
            error.response?.data?.message || "Something went wrong. Try again.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }
      }
    },
  });

  return (
    <div className="flex h-[80vh] overflow-hidden items-center justify-center bg-white">
      <div className="w-1/2 flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1741261518~exp=1741265118~hmac=eca48b90edb386f4f4eee125d8822467a8d85d3845e662ef729c78df58850ace&w=740"
          alt="Workspace"
          className="w-[80%] max-w-[500px]"
        />
      </div>

      <div className="w-1/2 max-w-lg">
        <h1 className="text-4xl font-bold text-pink-500 mb-3">Welcome Back!</h1>
        <p className="text-lg text-gray-500 mb-8">Log in to your account</p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <div className="flex items-center border-b-2 border-gray-300 py-3 text-xl">
              <FaEnvelope className="text-gray-400 mr-4" />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full focus:outline-none text-lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <div className="flex items-center border-b-2 border-gray-300 py-3 text-xl relative">
              <FaLock className="text-gray-400 mr-4" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full focus:outline-none text-lg"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute right-4 text-gray-400 cursor-pointer focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={`mt-8 w-full bg-pink-500 text-white py-4 rounded-full text-2xl font-semibold hover:bg-pink-600 transition ${
              !formik.isValid || !formik.dirty
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-lg text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-pink-500 font-bold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
