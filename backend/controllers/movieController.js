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

const getMovieControl = async (req, res) => {
  const { movieId } = req.body;

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
module.exports = { slideMovies, topRec, getMovieControl };
