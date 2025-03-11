const Movie = require("../models/Movie");

const slideMovies = async () => {
  return await Movie.find().sort({ vote_average: -1 }).limit(3);
};
const recMovies = async() =>{
  return await  Movie.aggregate([{$sample:{size:10}}])
}
module.exports = { slideMovies, recMovies };
