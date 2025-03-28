import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { recList } from "../api/movieApi";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Bookmark, ArrowRight } from "lucide-react";

const RecList = () => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await recList();
        setMovies(response.data || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    updateArrowsVisibility();
  }, [movies]);

  const updateArrowsVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 4 : clientWidth / 4;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });

      setTimeout(updateArrowsVisibility, 300);
    }
  };

  

  return (
    <div className="p-4 relative w-[65vw] mx-auto">
      {/* Header with "Recommended Movies" & "Show All" Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Recommended Movies</h2>
        <button
          className="flex items-center text-red-500 font-semibold text-lg hover:text-red-600 transition duration-300"
          onClick={() => navigate("/allMovies")}
        >
          Show All <ArrowRight className="h-5 w-5 ml-1" />
        </button>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white z-10 hover:bg-red-500 transition-all duration-300"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateArrowsVisibility}
          className="flex space-x-10 overflow-hidden scrollbar-hide"
          style={{ width: "100%" }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie._id}
              className="movie-card min-w-[22%] max-w-[18%] rounded-lg overflow-hidden bg-gradient-to-t from-black to-gray-900 cursor-pointer relative hover:shadow-[0_4px_15px_rgba(0,0,0,1)] transition-shadow duration-300"
              onClick={() => navigate(`/movieInfo/${movie._id}`)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.15, // Staggered animation for each card
              }}
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-95 object-cover"
              />
              {/* <button
                className="absolute top-2 right-2 bg-white bg-opacity-80 p-1 rounded-full hover:bg-gray-200 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // console.log(`Saved movie ID: ${movie._id}`);
                }}
              >
                <Bookmark className="h-5 w-5 text-black hover:text-red-500" />
              </button> */}
              <div className="p-4 text-white">
                <div className="flex items-center text-red-500 font-bold">
                  <Star className="h-4 w-4 mr-1 fill-red-500" />
                  {movie.vote_average.toFixed(1)} / 10
                  <span className="text-gray-400 ml-2">{movie.vote_count} Votes</span>
                </div>
                <div className="relative">
                  <h3
                    className="text-lg font-semibold mt-2 truncate"
                    style={{
                      position: "relative",
                      maxWidth: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {movie.title}
                    <span
                      className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black"
                      style={{
                        display: movie.title.length > 20 ? "block" : "none",
                      }}
                    />
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white z-10 hover:bg-red-500 transition-all duration-300"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecList;
