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
  CircularProgress,
  Alert,
} from "@mui/material";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const AddMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
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

  // Fetch movies function for reuse
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await allMovies();
      setMovies(response.data);
      setFilteredMovies(response.data);
      return response.data;
    } catch (error) {
      setError("Failed to fetch movies");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    let isValid = true;
    
    // Check each field for validity
    if (!movie.title.trim()) {
      tempErrors.title = "Title is required.";
      isValid = false;
    }
    
    if (!movie.overview.trim()) {
      tempErrors.overview = "Overview is required.";
      isValid = false;
    }
    
    if (!movie.backdrop_path.trim()) {
      tempErrors.backdrop_path = "Backdrop path is required.";
      isValid = false;
    } else if (!movie.backdrop_path.startsWith("http")) {
      tempErrors.backdrop_path = "Enter a valid image URL starting with 'http'.";
      isValid = false;
    }
    
    if (!movie.poster_path.trim()) {
      tempErrors.poster_path = "Poster path is required.";
      isValid = false;
    } else if (!movie.poster_path.startsWith("http")) {
      tempErrors.poster_path = "Enter a valid image URL starting with 'http'.";
      isValid = false;
    }
    
    if (!movie.release_date) {
      tempErrors.release_date = "Release date is required.";
      isValid = false;
    }
    
    if (!movie.price) {
      tempErrors.price = "Price is required.";
      isValid = false;
    } else if (isNaN(movie.price) || parseFloat(movie.price) <= 0) {
      tempErrors.price = "Enter a valid price greater than zero.";
      isValid = false;
    }
    
    if (!movie.vote_count) {
      tempErrors.vote_count = "Vote count is required.";
      isValid = false;
    } else if (isNaN(movie.vote_count) || parseInt(movie.vote_count) < 0) {
      tempErrors.vote_count = "Vote count must be a non-negative number.";
      isValid = false;
    }
    
    if (!movie.vote_average) {
      tempErrors.vote_average = "Vote average is required.";
      isValid = false;
    } else if (
      isNaN(movie.vote_average) ||
      parseFloat(movie.vote_average) < 1 ||
      parseFloat(movie.vote_average) > 10
    ) {
      tempErrors.vote_average = "Vote average must be between 1 and 10.";
      isValid = false;
    }
    
    if (!movie.language) {
      tempErrors.language = "Language is required.";
      isValid = false;
    }
    
    if (!movie.status) {
      tempErrors.status = "Status is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleDeleteMovie = async (movieId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!isConfirmed) return;

    try {
      setSubmitting(true);
      await delMovie(movieId);
      
      // Refresh the movie list after deletion
      await fetchMovies();
      
      if (selectedMovie && selectedMovie._id === movieId) {
        setSelectedMovie(null);
        resetForm();
      }
      
      alert("Movie deleted successfully!");
    } catch (error) {
      setSubmitError("Failed to delete movie. Please try again.");
      alert("Failed to delete movie. Please try again.");
    } finally {
      setSubmitting(false);
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
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const resetForm = () => {
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
    setErrors({});
    setSubmitError(null);
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      try {
        setSubmitting(true);
        const movieData = {
          ...movie,
          vote_average: parseFloat(movie.vote_average).toFixed(2),
          price: parseFloat(movie.price),
          vote_count: parseInt(movie.vote_count),
        };
        
        await updateMovie(selectedMovie._id, movieData);
        
        // Refresh movie list after update
        await fetchMovies();
        
        // Reset form fields
        resetForm();
        setSelectedMovie(null);
        
        alert("Movie updated successfully!");
      } catch (error) {
        setSubmitError("Failed to update movie. Please try again.");
        alert("Failed to update movie. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      try {
        setSubmitting(true);
        const movieData = {
          ...movie,
          vote_average: parseFloat(movie.vote_average).toFixed(2),
          price: parseFloat(movie.price),
          vote_count: parseInt(movie.vote_count),
        };

        await addMovie(movieData); // Send request to backend
        
        // Refresh movie list after adding
        await fetchMovies();
        
        // Reset form fields
        resetForm();
        
        alert("Movie added successfully!");
      } catch (error) {
        setSubmitError("Failed to add movie. Please try again.");
        alert("Failed to add movie. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setMovie(movie);
    setErrors({});
    setSubmitError(null);
  };

  const handleCancelEdit = () => {
    setSelectedMovie(null);
    resetForm();
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
          <InputLabel>Language *</InputLabel>
          <Select
            name={field}
            value={movie[field]}
            label="Language *"
            onChange={handleChange}
            required
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
          <InputLabel>Status *</InputLabel>
          <Select
            name={field}
            value={movie[field]}
            label="Status *"
            onChange={handleChange}
            required
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
          label="RELEASE DATE *"
          name={field}
          value={movie[field]}
          onChange={handleChange}
          margin="normal"
          error={!!errors[field]}
          helperText={errors[field] || ""}
          type="date"
          required
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
        label={`${field.replace("_", " ").toUpperCase()} *`}
        name={field}
        value={movie[field]}
        onChange={handleChange}
        margin="normal"
        error={!!errors[field]}
        helperText={errors[field] || ""}
        required
        type={
          ["price", "vote_count", "vote_average"].includes(field)
            ? "number"
            : "text"
        }
        inputProps={
          field === "vote_average"
            ? { min: 1, max: 10, step: "0.01" }
            : field === "price"
            ? { min: 0.01, step: "0.01" }
            : field === "vote_count"
            ? { min: 0 }
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
                  <TableCell colSpan={4} align="center">
                    <CircularProgress size={24} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Loading movies...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Alert severity="error">{error}</Alert>
                  </TableCell>
                </TableRow>
              ) : filteredMovies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No movies found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMovies.map((movie) => (
                  <TableRow
                    key={movie._id}
                    hover
                    onClick={() => handleSelectMovie(movie)}
                    selected={selectedMovie && selectedMovie._id === movie._id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{movie.title}</TableCell>
                    <TableCell align="right">₹{movie.price || "N/A"}</TableCell>
                    <TableCell align="right">{movie.status || "N/A"}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        disabled={submitting}
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

      {/* Movie Form - Adjusted to fit screen height */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        p={3}
        sx={{
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: "100%", 
            maxWidth: "800px", 
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 40px)", // Account for padding
            overflow: "auto"
          }}
        >
          <Typography variant="h5" gutterBottom>
            {selectedMovie ? "Edit Movie" : "Add Movie"}
          </Typography>
          
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            All fields marked with * are required
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={selectedMovie ? handleUpdateMovie : handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "auto"
            }}
          >
            <Box sx={{ flexGrow: 1, overflow: "auto", pr: 1 }}>
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
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2} pt={2} borderTop="1px solid #eee">
              {selectedMovie && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<FaTimes />}
                  onClick={handleCancelEdit}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={selectedMovie ? <FaSave /> : null}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    {selectedMovie ? "Updating..." : "Submitting..."}
                  </>
                ) : (
                  selectedMovie ? "Update Movie" : "Submit Movie"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddMovies;