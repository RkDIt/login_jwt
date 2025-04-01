import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12);

const movieSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  poster_path: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  release_date: { type: String, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Upcoming", "Now-playing", "Removed"],
    default: "Now-playing",
  },
  language: {
    type: String,
    enum: ["English", "Hindi", "Punjabi"],
    default: "English",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
