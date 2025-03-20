import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Edit, Plus } from "lucide-react";

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user || {}; // Retrieve user data

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-t-lg text-white text-center">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-600">+ Add</span>
            </div>
            <h2 className="text-2xl font-semibold mt-2">
              Hi, {user.name || "Guest"}
            </h2>
          </div>
        </div>

        {/* Account Details */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Account Details</h3>
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-600">
              <strong>Email Address</strong>: {user.email}{" "}
              <span className="text-green-600 text-xs border border-green-400 px-2 py-1 rounded-md">
                Verified
              </span>
            </p>
            <Edit className="text-gray-500 cursor-pointer" size={18} />
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm flex items-center">
            <Plus size={16} className="mr-2" />
            <span>
              <strong>+ Add Mobile Number</strong>
              <br />
              <span className="text-xs">
                Get a copy of the tickets on Whatsapp/SMS
              </span>
            </span>
          </div>
        </div>

        {/* Personal Details */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
          <form className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">First Name</label>
              <input
                type="text"
                placeholder="Enter first name here"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name here"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-gray-600 block mb-1">
                Birthday (Optional)
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-gray-600 block mb-2">
                Identity (Optional)
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-400 rounded-lg text-gray-600"
                >
                  Woman
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-400 rounded-lg text-gray-600"
                >
                  Man
                </button>
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-2">
                Married? (Optional)
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-400 rounded-lg text-gray-600"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-400 rounded-lg text-gray-600"
                >
                  No
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
