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

const topRec = async(req,res)=>{
        try {
            const data = await movieService.recMovies();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
}

module.exports = { slideMovies,topRec };