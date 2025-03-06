import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Full Name is required"),

    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email format (e.g., mail@domain.com)"
      )
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
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/register",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Signup successful!", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("Signup Error:", error);
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }
    },
  });

  return (
    <div className="flex h-[80vh] overflow-hidden items-center justify-center bg-white">
      
      <div className="w-1/2 flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/hand-draw-doodle-work-set-design_1035-20351.jpg?t=st=1741242694~exp=1741246294~hmac=b15bb79f3b8f6282b215445d7a0cb3f1f78fde2dcb48efe2be0cad9060c5a9df&w=740"
          alt="Workspace"
          className="w-[80%] max-w-[500px]"
        />
      </div>

      <div className="w-1/2 max-w-lg">
        <h1 className="text-4xl font-bold text-pink-500 mb-3">
          Save Your Account Now
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Get unlimited forms, questions, and responses, free forever.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col">
            <div className="flex items-center border-b-2 border-gray-300 py-3 text-xl">
              <FaUser className="text-gray-400 mr-4" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full focus:outline-none text-lg"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

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
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
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
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute right-4 text-gray-400 cursor-pointer focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full bg-pink-500 text-white py-4 rounded-full text-2xl font-semibold hover:bg-pink-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-lg text-gray-500">
          Already have an account?{" "}
          <span
            className="text-pink-500 font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
