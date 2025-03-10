const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String, required: true },
  vote_average: { type: String, required: true },
});

const Movie = mongoose.model("Movie",  movieSchema)
module.exports  = Movie;