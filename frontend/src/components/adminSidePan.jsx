import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Film,
  Users,
  DollarSign,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  UserCircle,
  LogOut,
} from "lucide-react";

const AdminSidePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load collapsed state from localStorage (default to true)
  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("sidebarCollapsed")) ?? true
  );

  // Update localStorage when collapsed state changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/logout"); 
    window.location.reload();
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Film, label: "Movies", path: "/movies" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: DollarSign, label: "Revenue", path: "/revenue" },
    // { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 shadow-lg ${
        collapsed ? "w-16" : "w-56"
      } p-2`}
    >
      {/* Admin Profile */}
      <div className="flex items-center justify-center p-3">
        <UserCircle className="h-12 w-12 text-white" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 mt-4 flex-grow">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-300 ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              {/* Icon */}
              <item.icon className="w-6 h-6" />
              {/* Render label only if not collapsed */}
              {!collapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mb-4 p-2 rounded-md bg-red-600 hover:bg-red-500 flex items-center justify-center w-full text-white"
      >
        <LogOut className="w-6 h-6" />
        {!collapsed && <span className="ml-2">Logout</span>}
      </button>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 p-2 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center justify-center w-full"
      >
        {collapsed ? <ChevronsRight className="w-6 h-6" /> : <ChevronsLeft className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AdminSidePanel;
