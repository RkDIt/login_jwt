import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { movieDetails } from "../api/movieApi";
import { Bookmark, Ticket, ArrowLeft } from "lucide-react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion"; // Animation Library

const formatVoteAverage = (vote) =>
  !isNaN(parseFloat(vote)) ? parseFloat(vote).toFixed(1) : "N/A";
const formatReleaseDate = (date) =>
  date ? new Date(date).getFullYear() : "Unknown";

const MovieInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [hoverSave, setHoverSave] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieDetails(id);
        setMovie(response.data || {});
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <Typography
        sx={{ color: "white", textAlign: "center", mt: 5, fontSize: "24px" }}
      >
        Loading...
      </Typography>
    );

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "transparent",
        }}
      >
        <Navbar />
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            minHeight: "100vh",
            color: "white",
            overflow: "hidden",
          }}
        >
          {/* Navbar (Fixed) */}

          {/* Push Content Below Navbar */}
          <Box sx={{ pt: "80px" }}>
            {/* Background Image with Blur */}
            {movie.backdrop_path && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${movie.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(10px)",
                  zIndex: -1,
                }}
              />
            )}

            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)",
                zIndex: -1,
              }}
            />

            {/* Main Content */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "1200px",
                margin: "auto",
                padding: "80px 40px",
              }}
            >
              {/* Left Content (Animates from Left) */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ width: "60%" }}
              >
                {/* Back Button */}
                <IconButton
                  onClick={() => navigate(-1)} // Go back without reloading
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(5px)",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.4)" },
                    mb: 3,
                  }}
                >
                  <ArrowLeft size={30} color="white" />
                </IconButton>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "58px",
                    lineHeight: "1.2",
                  }}
                >
                  {movie.title || "Movie Title"}{" "}
                  <Typography
                    component="span"
                    variant="h4"
                    sx={{ opacity: 0.8, fontWeight: "medium" }}
                  >
                    ({formatReleaseDate(movie.release_date)})
                  </Typography>
                </Typography>

                {/* Rating & Votes */}
                <Typography
                  variant="h5"
                  sx={{
                    mt: 3,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ⭐ {formatVoteAverage(movie.vote_average)} / 10{" "}
                  <Typography
                    component="span"
                    sx={{
                      ml: 3,
                      opacity: 0.8,
                      fontSize: "22px",
                      fontWeight: "medium",
                    }}
                  >
                    {movie.vote_count} Votes
                  </Typography>
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    mt: 4,
                    color: "gray.300",
                    fontSize: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  {movie.overview || "No description available."}
                </Typography>

                {/* Buttons */}
                <Box sx={{ mt: 6, display: "flex", gap: 3 }}>
                  {/* Book Now Button (Red) */}
                  <Button
                    onClick={() =>
                      navigate(`/booking/${id}`, {
                        state: { movieId: movie._id, movieName: movie.title, price: movie.price },
                      })
                    }
                    variant="contained"
                    startIcon={<Ticket />}
                    sx={{
                      backgroundColor: "#ff4757",
                      "&:hover": { backgroundColor: "#e84118" },
                      fontSize: "20px",
                      padding: "14px 30px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    Book Now
                  </Button>

                  {/* Save for Later Button (Expands to Reveal Text) */}
                  <motion.div
                    onMouseEnter={() => setHoverSave(true)}
                    onMouseLeave={() => setHoverSave(false)}
                    initial={{ width: "60px" }}
                    animate={{ width: hoverSave ? "200px" : "60px" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      backgroundColor: "#2f3640",
                      color: "white",
                      fontSize: "20px",
                      padding: "14px 20px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      border: "none",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {/* Bookmark Icon (Always Visible) */}
                    <div style={{ position: "absolute", left: "18px" }}>
                      <Bookmark size={24} />
                    </div>

                    {/* Revealed Text (Appears on Hover) */}
                    {hoverSave && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginLeft: "33px" }}
                      >
                        Save for Later
                      </motion.span>
                    )}
                  </motion.div>
                </Box>
              </motion.div>

              {/* Right Side - Poster (Animates from Right) */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  width: "35%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {movie.poster_path ? (
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      maxWidth: "350px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
                    No Image Available
                  </Typography>
                )}
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MovieInfo;
