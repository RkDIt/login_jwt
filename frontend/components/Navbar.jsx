import React from "react";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between py-3 px-70 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/">
          <img src="../src/assets/pngwing.com.png" alt="bookmyshow logo" className=" w-full h-[9vh]" />
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search for Movies, Events and Activities"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Location & Profile */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-sm cursor-pointer">
          Chandigarh <span className="ml-1">▼</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <img
            src="/profile.png"
            alt="profile_logo"
            className="h-6 w-6 rounded-full"
          />
          <span className="ml-2 text-sm">Hi, Guest</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;