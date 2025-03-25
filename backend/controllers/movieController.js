import Response from "../utils/apiResponse.js";
import {
  slideMovie,
  recMovies,
  getMovie,
  allMovies,
  addMovie,
  delMovie,
  updateMovie,
} from "../services/MovieServices.js";
import messages from "../utils/responseMsg.js";

export const slideMovies = async (req, res) => {
  try {
    const data = await slideMovie();

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
    const data = await recMovies();
    
    if (!data || data.length === 0) {
      return Response.error(res, {
        status: 404,
        message: messages.NO_DATA_FOUND,
      });
    }

    return Response.success(res, { 
      status: 200, 
      data,
      message: messages.FETCH_SUCCESS 
    });
  } catch (error) {
    console.error("Error in topRec:", error);
    
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const data = await allMovies();
    
    if (!data || data.length === 0) {
      return Response.error(res, {
        status: 404,
        message: messages.NO_DATA_FOUND,
      });
    }

    return Response.success(res, { 
      status: 200, 
      data,
      message: messages.FETCH_SUCCESS 
    });
  } catch (error) {
    console.error("Error in getAllMovies:", error);
    
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const getMovieControl = async (req, res) => {
  const { id: movieId } = req.params;

  try {
    const movieDetails = await getMovie(movieId);
    
    if (!movieDetails) {
      return Response.error(res, {
        status: 404,
        message: messages.NO_DATA_FOUND,
      });
    }

    return Response.success(res, {
      status: 200,
      data: movieDetails,
      message: messages.FETCH_SUCCESS,
    });
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    
    return Response.error(res, {
      status: error.status || 404,
      message: error.message || messages.SERVER_ERROR,
    });
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

    if (
      !title ||
      !overview ||
      !backdrop_path ||
      !poster_path ||
      !release_date ||
      !price
    ) {
      return Response.error(res, {
        status: 400,
        message: "All fields are required",
      });
    }

    const moviePrice = parseFloat(price);
    const avgVote = parseFloat(vote_average) || 0;
    const voteCount = parseInt(vote_count) || 0;

    if (isNaN(moviePrice) || moviePrice <= 0) {
      return Response.error(res, {
        status: 400,
        message: "Price must be a positive number",
      });
    }
    if (avgVote < 0 || avgVote > 10) {
      return Response.error(res, {
        status: 400,
        message: "Vote average must be between 0 and 10",
      });
    }
    if (voteCount < 0) {
      return Response.error(res, {
        status: 400,
        message: "Vote count cannot be negative",
      });
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

    const movie = await addMovie(newMovie);

    return Response.success(res, {
      status: 201,
      data: movie,
      message: "Movie added successfully",
    });
  } catch (error) {
    console.error("Error adding movie:", error);
    
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await delMovie(movieId);

    if (!deletedMovie) {
      return Response.error(res, {
        status: 404,
        message: "Movie not found",
      });
    }

    return Response.success(res, {
      status: 200,
      message: "Movie Deleted Successfully",
    });
  } catch (error) {
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const updateMovieControl = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    
    const updatedMovie = await updateMovie(id, updatedData);

    if (!updatedMovie) {
      return Response.error(res, {
        status: 404,
        message: "Movie not found or no updates applied",
      });
    }

    return Response.success(res, {
      status: 200,
      data: updatedMovie,
      message: "Movie Updated successfully",
    });
  } catch (error) {
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};