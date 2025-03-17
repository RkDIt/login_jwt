const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12); 

const movieSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() }, 
  // id: { type: Number, require: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String, required: true },
  vote_average: { type: String, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
