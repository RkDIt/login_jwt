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
  Button,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [availableLanguages, setAvailableLanguages] = useState(["All"]);
  const [loading, setLoading] = useState(true); // 🔹 Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await getAllMovies();
        const fetchedMovies = response.data || [];
        
        const uniqueLanguages = ["All", ...new Set(
          fetchedMovies
            .map(movie => movie.language)
            .filter(lang => lang)
            .map(lang => lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase())
        )];

        setMovies(fetchedMovies);
        setOriginalMovies(fetchedMovies);
        setAvailableLanguages(uniqueLanguages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false); // 🔹 Stop loading when data is fetched
      }
    };
    fetchAllMovies();
  }, []);

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
    if (language === "All") {
      setMovies(originalMovies);
    } else {
      setMovies(originalMovies.filter(
        (movie) => movie.language.toLowerCase() === language.toLowerCase()
      ));
    }
  };

  return (
    <>
      <Navbar />
      <Box style={{ backgroundColor: "white", minHeight: "100vh", paddingBottom: "20px" }}>
        
        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          style={{
            position: "fixed", top: "115px", left: "300px",
            color: "black", backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Container maxWidth="lg" style={{ padding: "24px", marginTop: "10px" }}>
          
          {/* Language Filter Buttons */}
          <Box display="flex" justifyContent="center" gap={2} marginBottom={4}>
            {availableLanguages.map((language) => (
              <Button
                key={language}
                variant={selectedLanguage === language ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleLanguageFilter(language)}
              >
                {language}
              </Button>
            ))}
          </Box>

          <Typography variant="h4" style={{ marginBottom: "24px", fontWeight: "600" }}>
            {selectedLanguage} Movies
          </Typography>

          {/* Movie Grid or Skeleton Loader */}
          <Grid container spacing={4} justifyContent="center">
            {loading
              ? // 🔹 Show Skeletons when loading
                [...Array(8)].map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
                    <Card style={{ width: "100%", height: "450px", borderRadius: "10px" }}>
                      <Skeleton variant="rectangular" width="100%" height="85%" />
                      <CardContent>
                        <Skeleton variant="text" width="60%" height={30} />
                        <Skeleton variant="text" width="40%" height={20} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : // 🔹 Show actual movies when loaded
                movies.map((movie) => (
                  <Grid item key={movie._id} xs={12} sm={6} md={3} lg={3}>
                    <Card
                      onClick={() => navigate(`/movieInfo/${movie._id}`)}
                      style={{
                        cursor: "pointer", backgroundColor: "#1c1c1c", color: "white",
                        transition: "transform 0.3s ease", borderRadius: "10px",
                        overflow: "hidden", position: "relative", width: "100%", height: "450px",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <CardMedia
                        component="img"
                        image={movie.poster_path}
                        alt={movie.title}
                        style={{ width: "100%", height: "85%", objectFit: "cover" }}
                      />

                      {/* Movie Info */}
                      <CardContent
                        style={{
                          position: "absolute", bottom: "10px", left: "10px", right: "10px",
                          color: "white", display: "flex", flexDirection: "column",
                        }}
                      >
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            variant="h6"
                            style={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "75%" }}
                            title={movie.title}
                          >
                            {movie.title}
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <StarIcon style={{ color: "#FFD700", fontSize: "1rem" }} />
                            <Typography variant="body2">
                              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>

          {/* No Movies Found */}
          {!loading && movies.length === 0 && (
            <Typography variant="h6" align="center" style={{ marginTop: "50px", color: "gray" }}>
              No movies found for {selectedLanguage} language
            </Typography>
          )}
        </Container>
      </Box>
    </>
  );
};

export default AllMovies;
