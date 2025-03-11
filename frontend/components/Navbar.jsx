import React, { useEffect, useState } from "react";
import { Search, ChevronDown, User } from "lucide-react";
import { getUserDetails } from "../api/userApi";


const Navbar = () => {
  const [userName, setUserName] = useState("Guest");

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

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between py-2 md:px-90 px-4 z-50">
      {/* Logo and Search Bar */}
      <div className="flex items-center w-full md:w-[40vw]">
        <a href="/" className="flex-shrink-0">
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
        <div className="flex items-center cursor-pointer">
          <User className="h-6 w-6 text-gray-600" />
          <span className="ml-2 text-sm">Hi, {userName}</span>
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
