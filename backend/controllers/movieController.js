import Response from "../utils/apiResponse.js";
import movieService from "../services/MovieServices.js";
import messages from "../utils/responseMsg.js";

export const slideMovies = async (req, res) => {
  try {
    const data = await movieService.slideMovies();

    if (!data || data.length === 0) {
      return Response.error(res, {
        status: 404,
        message: messages.NO_DATA_FOUND,
      });
    }

    return Response.success(res, {
      status: 200,
      data,
      message: messages.FETCH_SUCCESS,
    });
  } catch (error) {
    console.error("Error in slideMovies:", error);

    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const topRec = async (req, res) => {
  try {
    const data = await movieService.recMovies();
    return Response.success(res, { status: 200, data });
  } catch (error) {
    console.error("Error in topRec:", error);
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const data = await movieService.allMovies();
    return Response.success(res, { status: 200, data });
  } catch (error) {
    console.error("Error in getAllMovies:", error);
  }
};

export const getMovieControl = async (req, res) => {
  const { id: movieId } = req.params;

  try {
    const movieDetails = await movieService.getMovie(movieId);
    return res.status(200).json({ success: true, data: movieDetails });
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const addMovieControl = async (req, res) => {
  try {
    const {
      title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      price,
      vote_average,
      vote_count,
    } = req.body;

    if (!title || !overview || !backdrop_path || !poster_path || !release_date || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const moviePrice = parseFloat(price);
    const avgVote = parseFloat(vote_average) || 0;
    const voteCount = parseInt(vote_count) || 0;

    if (isNaN(moviePrice) || moviePrice <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }
    if (avgVote < 0 || avgVote > 10) {
      return res.status(400).json({ message: "Vote average must be between 0 and 10" });
    }
    if (voteCount < 0) {
      return res.status(400).json({ message: "Vote count cannot be negative" });
    }

    const newMovie = {
      title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      price: moviePrice,
      vote_average: avgVote,
      vote_count: voteCount,
    };

    const movie = await movieService.addMovie(newMovie);

    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await movieService.delMovie(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
