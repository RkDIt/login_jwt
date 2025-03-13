import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  User,
  Bookmark,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { getUserDetails } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("Guest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Use navigate for programmatic routing

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserDetails();
        if (userData?.data.name) {
          setUserName(userData.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between py-3 md:px-90 px-4 z-50">
      {/* Logo and Search Bar */}
      <div className="flex items-center w-full md:w-[40vw]">
        <a
          href=""
          className="flex-shrink-0"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src="../src/assets/pngwing.com.png"
            alt="bookmyshow logo"
            className="w-[120px] h-[6vh] md:w-full"
          />
        </a>
        <div className="flex-1 mx-4 max-w-[500px] hidden md:block">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search for Movies, Events and Activities"
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>

      {/* Location & Profile */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="flex items-center text-sm cursor-pointer">
          Chandigarh <ChevronDown className="ml-1" size={16} />
        </div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <User className="h-6 w-6 text-gray-600 transition-transform duration-300 ease-in-out transform hover:scale-110" />
            <span className="ml-2 text-sm">Hi, {userName}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 left-3 top-7 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-opacity duration-300 ease-in-out">
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 transition duration-200"
              >
                <User size={16} className="mr-2" /> Profile
              </button>
              <button
                onClick={() => navigate("/watchlist")}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 transition duration-200"
              >
                <Bookmark size={16} className="mr-2" /> Watch List
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 transition duration-200"
              >
                <Package size={16} className="mr-2" /> Orders
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 transition duration-200"
              >
                <Settings size={16} className="mr-2" /> Settings
              </button>
              <button
                onClick={() => navigate("/logout")}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-red-500 hover:text-white border-t transition duration-200"
              >
                <LogOut size={16} className="mr-2" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar for Smaller Screens */}
      <div className="w-full mt-2 block md:hidden">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search for Movies, Events and Activities"
            className="w-full outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
