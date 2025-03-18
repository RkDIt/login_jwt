const Response = require("../utils/apiResponse");
const movieService = require("../services/MovieServices");
const messages = require("../utils/responseMsg");

const slideMovies = async (req, res) => {
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

const topRec = async (req, res) => {
  try {
    const data = await movieService.recMovies();
    // console.log(data)
    return Response.success(res, {
      status: 200,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const data = await movieService.allMovies();
    return Response.success(res, {
      status: 200,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMovieControl = async (req, res) => {
  const { id: movieId } = req.params;

  try {
    const movieDetails = await movieService.getMovie(movieId);

    return res.status(200).json({
      success: true,
      data: movieDetails,
    });
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


const addMovieControl = async (req, res) => {
  try {
    const { title, overview, backdrop_path, poster_path, release_date, price, vote_average, vote_count } = req.body;

    // Validate required fields
    if (!title || !overview || !backdrop_path || !poster_path || !release_date || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert numeric values and validate
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

    // Create new movie object
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

    // Add movie to the database
    const movie = await movieService.addMovie(newMovie);

    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  slideMovies,
  topRec,
  getMovieControl,
  getAllMovies,
  addMovieControl,
};
