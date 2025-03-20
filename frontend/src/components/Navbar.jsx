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
import { getAllMovies } from "../api/movieApi";

const Navbar = () => {
  const [userName, setUserName] = useState("Guest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [userCity, setUserCity] = useState("Loading...");

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2da0548ab0bb4d5890716786b1c5810e`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              const city =
                data.results[0].components.city ||
                data.results[0].components.town ||
                "Unknown";
              setUserCity(city);
            }
          } catch (error) {
            console.error("Error fetching city:", error);
            setUserCity("Unavailable");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUserCity("Unavailable");
        }
      );
    } else {
      setUserCity("Unavailable");
    }
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserDetails();
        localStorage.setItem("userId", userData.data._id);
        if (userData?.data.name) {
          setUserName(userData.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await getAllMovies();
        setMovies(response.data || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchAllMovies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredMovies([]);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 0) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
      setHighlightedIndex(-1);
    } else {
      setFilteredMovies([]);
      setHighlightedIndex(-1);
    }
  };

  const handleMovieSelect = (movieId) => {
    navigate(`/movieInfo/${movieId}`);
    setSearchTerm("");
    setFilteredMovies([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (filteredMovies.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredMovies.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleMovieSelect(filteredMovies[highlightedIndex]._id);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between py-3 md:px-84 px-4 z-[999]">
        <div className="flex items-center w-full md:w-[40vw]">
          <a
            onClick={() => navigate("/dashboard")}
            className="flex-shrink-0 cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/75/Bookmyshow-logoid.png"
              alt="logo"
              className="w-[100px] h-[5vh] md:w-full"
            />
          </a>

          {/* Search Bar */}
          <div
            className="relative flex-1 mx-4 max-w-[500px] hidden md:block"
            ref={searchRef}
          >
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search Movies..."
                className="w-full outline-none"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Search Dropdown */}
            {filteredMovies.length > 0 && (
              <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-md rounded-lg mt-1 max-h-60 overflow-y-auto z-50">
                {filteredMovies.map((movie, index) => (
                  <div
                    key={movie._id}
                    className={`px-4 py-2 cursor-pointer ${
                      highlightedIndex === index
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleMovieSelect(movie._id)}
                  >
                    {movie.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center text-sm cursor-pointer">
          {userCity} 
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
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  <User size={16} className="mr-2" /> Profile
                </button>
                <button
                  onClick={() => navigate("/watchlist")}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  <Bookmark size={16} className="mr-2" /> Watch List
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  <Package size={16} className="mr-2" /> Orders
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  <Settings size={16} className="mr-2" /> Settings
                </button>
                <button
                  onClick={() => navigate("/logout")}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-red-500 hover:text-white border-t"
                >
                  <LogOut size={16} className="mr-2" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-[72px] md:pt-[80px]"></div>
    </>
  );
};

export default Navbar;
