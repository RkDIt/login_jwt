import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllMovies } from "../api/movieApi";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

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

  return (
    <>
      <Navbar />
      <Box
        style={{
          backgroundColor: "white",
          minHeight: "100vh",
          color: "black",
          paddingBottom: "20px",
        }}
      >
        {/* Back Button - Fixed at the top */}
        <IconButton
          onClick={() => navigate(-1)}
          style={{
            position: "fixed",
            top: "115px",
            left: "300px",
            color: "black",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(200, 200, 200, 0.9)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.7)")}
        >
          <ArrowBackIcon />
        </IconButton>

        <Container maxWidth="lg" style={{ padding: "24px", marginTop: "10px" }}>
          <Typography
            variant="h4"
            style={{
              marginBottom: "24px",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            All Movies
          </Typography>

          {/* Movie Grid */}
          <Grid container spacing={4} justifyContent="center">
            {movies.map((movie) => (
              <Grid item key={movie._id} xs={12} sm={6} md={3} lg={3}>
                <Card
                  onClick={() => navigate(`/movieInfo/${movie._id}`)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#1c1c1c",
                    color: "white",
                    transition: "transform 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                    height: "450px", // Fixed height for consistency
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {/* Movie Poster */}
                  <CardMedia
                    component="img"
                    image={movie.poster_path}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "85%", // Adjusted height for consistency
                      objectFit: "cover",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <Box
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "35%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                    }}
                  ></Box>

                  {/* Movie Info */}
                  <CardContent
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      right: "10px",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "75%",
                        }}
                        title={movie.title}
                      >
                        {movie.title}
                      </Typography>

                      {/* Rating with Star Icon */}
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <StarIcon
                          style={{ color: "#FFD700", fontSize: "1rem" }}
                        />
                        <Typography variant="body2">
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AllMovies;
