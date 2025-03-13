const Movie = require("../models/Movie");

const slideMovies = async () => {
  return await Movie.find().sort({ vote_average: -1 }).limit(3);
};
const recMovies = async() =>{
  return await  Movie.aggregate([{$sample:{size:10}}])
}

const getMovie = async (movieId) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie; 
};
module.exports = { slideMovies, recMovies,getMovie };
 