import React, { useEffect, useState } from "react";
import { slideMovies } from "../api/movieApi";
import { useNavigate } from "react-router-dom";


const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await slideMovies();
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 9000); // Change movie every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [movies]);

  // if (loading) {
  //   return <div className="text-center py-10">Loading...</div>;
  // }

  if (!movies.length) {
    return <div className="text-center py-10">No movies available.</div>;
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="carousel-container w-screen h-[80vh] flex items-center justify-center overflow-hidden relative">
      {movies.map((movie, index) => (
        <div key={movie._id} className="absolute w-full h-full">
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className={`w-full h-[90vh] object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/60"></div>
        </div>
      ))}
      <div className="absolute bottom-10 left-5 md:left-20 lg:left-42 text-white p-6 rounded-lg text-left max-w-[90%] md:max-w-[60%]">
        <h1 className="text-[30px] md:text-[50px] font-extrabold text-red-500">Now Playing</h1>
        <h3 className="text-[30px] md:text-[80px] font-extrabold leading-tight">{currentMovie.title}</h3>
        <div className="flex items-center gap-4">
          <p className="text-lg md:text-xl">⭐ {parseFloat(currentMovie.vote_average).toFixed(1)} | {new Date(currentMovie.release_date).getFullYear()}</p>
          <button className="bg-red-500 px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-red-700 transition duration-300" onClick={()=>navigate(`/movieInfo/${currentMovie._id}`)}>See Details</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;