import React, { useEffect, useState } from "react";
import { slideMovies } from "../api/movieApi";

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

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
            alt={movie.name}
            className={`w-full h-[90vh] object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-black/80"></div>
        </div>
      ))}
      <div className="absolute bottom-10 left-5 md:left-20 lg:left-32 text-white p-6 rounded-lg text-left max-w-[90%] md:max-w-[60%]">
        <h1 className="text-[30px] md:text-[50px] font-extrabold text-red-500">Now Playing</h1>
        <h3 className="text-[30px] md:text-[80px] font-extrabold leading-tight">{currentMovie.name}</h3>
        <div className="flex items-center gap-4">
          <p className="text-lg md:text-xl">⭐ {parseFloat(currentMovie.vote_average).toFixed(1)} | {new Date(currentMovie.first_air_date).getFullYear()}</p>
          <button className="bg-red-500 px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-red-600 transition duration-300">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;