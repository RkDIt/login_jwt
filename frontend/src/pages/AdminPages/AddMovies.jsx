import React, { useState, useEffect } from "react";
import AdminSidePanel from "../../components/adminSidePan";
import { allMovies, addMovie, delMovie, updateMovie } from "../../api/movieApi";

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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

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
    language: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  // Language options
  const languageOptions = [
    "English",
    "Hindi", 
    "Punjabi", 
    "Tamil", 
    "Japanese"
  ];

  // Status options
  const statusOptions = [
    "Removed",
    "Upcoming",
    "Now-playing"
  ];

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
    if (!movie.language)
      tempErrors.language = "Language is required.";
    if (!movie.status)
      tempErrors.status = "Status is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleDeleteMovie = async (movieId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!isConfirmed) return;

    try {
      await delMovie(movieId);
      alert("Movie deleted successfully!");

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );
      setFilteredMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );

      if (selectedMovie && selectedMovie._id === movieId) {
        setSelectedMovie(null);
      }
    } catch (error) {
      alert("Failed to delete movie. Please try again.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Capitalize the first letter for title and overview
    if (name === "title" || name === "overview") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // Ensure vote_average does not exceed 10
    if (name === "vote_average") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        formattedValue = Math.min(numericValue, 10); // Cap the value at 10
      }
    }

    setMovie({ ...movie, [name]: formattedValue });
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const movieData = {
        ...movie,
        vote_average: parseFloat(movie.vote_average).toFixed(2),
      };
      
      try {
        await updateMovie(selectedMovie._id, movieData)
        alert("Movie updated successfully!");

        // Update movie in the list
        setMovies((prevMovies) =>
          prevMovies.map((m) =>
            m._id === selectedMovie._id ? { ...m, ...movieData } : m
          )
        );

        // Reset form fields
        setMovie({
          title: "",
          overview: "",
          backdrop_path: "",
          poster_path: "",
          release_date: "",
          price: "",
          vote_count: "",
          vote_average: "",
          language: "",
          status: "",
        });

        setSelectedMovie(null);
      } catch (error) {
        alert("Failed to update movie. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const movieData = {
        ...movie,
        vote_average: parseFloat(movie.vote_average).toFixed(2),
      };

      try {
        await addMovie(movieData); // Send request to backend
        alert("Movie added successfully!");

        // Refresh movie list after adding
        setMovies((prevMovies) => [...prevMovies, movieData]);
        setFilteredMovies((prevMovies) => [...prevMovies, movieData]);

        // Reset form fields
        setMovie({
          title: "",
          overview: "",
          backdrop_path: "",
          poster_path: "",
          release_date: "",
          price: "",
          vote_count: "",
          vote_average: "",
          language: "",
          status: "",
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

  const handleCancelEdit = () => {
    setSelectedMovie(null);
    setMovie({
      title: "",
      overview: "",
      backdrop_path: "",
      poster_path: "",
      release_date: "",
      price: "",
      vote_count: "",
      vote_average: "",
      language: "",
      status: "",
    });
  };

  // Function to render form fields
  const renderTextField = (field) => {
    // Special handling for language field
    if (field === "language") {
      return (
        <FormControl 
          key={field} 
          fullWidth 
          margin="normal" 
          error={!!errors[field]}
        >
          <InputLabel>Language</InputLabel>
          <Select
            name={field}
            value={movie[field]}
            label="Language"
            onChange={handleChange}
          >
            {languageOptions.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
          {errors[field] && (
            <Typography color="error" variant="caption">
              {errors[field]}
            </Typography>
          )}
        </FormControl>
      );
    }

    // Special handling for status field
    if (field === "status") {
      return (
        <FormControl 
          key={field} 
          fullWidth 
          margin="normal" 
          error={!!errors[field]}
        >
          <InputLabel>Status</InputLabel>
          <Select
            name={field}
            value={movie[field]}
            label="Status"
            onChange={handleChange}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {errors[field] && (
            <Typography color="error" variant="caption">
              {errors[field]}
            </Typography>
          )}
        </FormControl>
      );
    }

    // Special handling for release_date
    if (field === "release_date") {
      return (
        <TextField
          key={field}
          fullWidth
          label="RELEASE DATE"
          name={field}
          value={movie[field]}
          onChange={handleChange}
          margin="normal"
          error={!!errors[field]}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            placeholder: "DD-MM-YYYY",
          }}
        />
      );
    }

    // Default text field rendering
    return (
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
        type={
          ["price", "vote_count", "vote_average"].includes(field)
            ? "number"
            : "text"
        }
        inputProps={
          field === "vote_average"
            ? { min: 1, max: 10, step: "0.01" }
            : {}
        }
      />
    );
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
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading movies...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ color: "red" }}>
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
                    <TableCell align="right">{movie.status || "N/A"}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                          handleDeleteMovie(movie._id);
                        }}
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
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "500px" }}>
          <Typography variant="h5" gutterBottom>
            {selectedMovie ? "Edit Movie" : "Add Movie"}
          </Typography>
          <form onSubmit={selectedMovie ? handleUpdateMovie : handleSubmit}>
            {[
              "title",
              "overview",
              "backdrop_path",
              "poster_path",
              "release_date",
              "price",
              "vote_count",
              "vote_average",
              "language",
              "status"
            ].map((field) => renderTextField(field))}
            <Box display="flex" justifyContent="space-between" mt={2}>
              {selectedMovie && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<FaTimes />}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={selectedMovie ? <FaSave /> : null}
              >
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