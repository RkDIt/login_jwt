import React, { useState, useEffect } from "react";
import AdminSidePanel from "../../components/adminSidePan";
import { allMovies, addMovie } from "../../api/movieApi";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";

const AddMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    backdrop_path: "",
    poster_path: "",
    release_date: "",
    price: "",
    vote_count: "",
    vote_average: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await allMovies();
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, movies]);

  const validateForm = () => {
    let tempErrors = {};
    if (!movie.title.trim()) tempErrors.title = "Title is required.";
    if (!movie.overview.trim()) tempErrors.overview = "Overview is required.";
    if (!movie.backdrop_path.trim() || !movie.backdrop_path.startsWith("http"))
      tempErrors.backdrop_path = "Enter a valid image URL.";
    if (!movie.poster_path.trim() || !movie.poster_path.startsWith("http"))
      tempErrors.poster_path = "Enter a valid image URL.";
    if (!movie.release_date)
      tempErrors.release_date = "Release date is required.";
    if (!movie.price || isNaN(movie.price) || movie.price <= 0)
      tempErrors.price = "Enter a valid price.";
    if (!movie.vote_count || isNaN(movie.vote_count) || movie.vote_count < 0)
      tempErrors.vote_count = "Vote count must be a non-negative number.";
    if (
      !movie.vote_average ||
      isNaN(movie.vote_average) ||
      movie.vote_average < 1 ||
      movie.vote_average > 10
    )
      tempErrors.vote_average = "Vote average must be between 1 and 10.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let formattedValue = value;
  
    if (name === "title" || name === "overview") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
  
    if (name === "vote_average") {
      // Allow only numbers with up to 2 decimal places and max 10
      if (/^\d{0,2}(\.\d{0,2})?$/.test(value) || value === "") {
        const numericValue = parseFloat(value);
        if (numericValue > 10) {
          formattedValue = "10.00"; // Limit max to 10
        } else {
          formattedValue = value;
        }
      } else {
        return; // Prevent invalid input
      }
    }
  
    setMovie({ ...movie, [name]: formattedValue });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const movieData = { ...movie };

      try {
        await addMovie(movieData);
        alert("Movie added successfully!");

        setMovies((prevMovies) => [...prevMovies, movieData]);
        setFilteredMovies((prevMovies) => [...prevMovies, movieData]);

        setMovie({
          title: "",
          overview: "",
          backdrop_path: "",
          poster_path: "",
          release_date: "",
          price: "",
          vote_count: "",
          vote_average: "",
        });

        setSelectedMovie(null);
      } catch (error) {
        alert("Failed to add movie. Please try again.");
      }
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setMovie(movie);
  };

  return (
    <Box display="flex" height="100vh">
      <AdminSidePanel />

      {/* Movie List */}
      <Box width="30%" p={2} borderRight="1px solid #ccc" overflow="hidden">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Movie List</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Price (₹)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3}>Loading movies...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ color: "red" }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMovies.map((movie) => (
                  <TableRow
                    key={movie._id}
                    hover
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <TableCell>{movie.title}</TableCell>
                    <TableCell align="right">₹{movie.price || "N/A"}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        onClick={() => console.log("Delete", movie._id)}
                      >
                        <FaTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Movie Form */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center" p={3}>
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "500px" }}>
          <Typography variant="h5" gutterBottom>
            {selectedMovie ? "Edit Movie" : "Add Movie"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {["title", "overview", "backdrop_path", "poster_path", "release_date", "price", "vote_count"].map((field) => (
              <TextField
                key={field}
                fullWidth
                label={field.replace("_", " ").toUpperCase()}
                name={field}
                value={movie[field]}
                onChange={handleChange}
                margin="normal"
                error={!!errors[field]}
                helperText={errors[field] || ""}
              />
            ))}
            <TextField
              fullWidth
              label="VOTE AVERAGE (1-10)"
              name="vote_average"
              value={movie.vote_average}
              onChange={handleChange}
              margin="normal"
              error={!!errors.vote_average}
              helperText={errors.vote_average || ""}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained" color="primary">
                {selectedMovie ? "Update Movie" : "Submit Movie"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddMovies;
