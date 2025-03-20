import Movie from "../models/Movie.js";

const slideMovies = async () => {
  return await Movie.find().sort({ vote_average: -1 }).limit(3);
};

const recMovies = async () => {
  return await Movie.aggregate([{ $sample: { size: 10 } }]);
};

const getMovie = async (movieId) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie;
};

const allMovies = async () => {
  const allMovies = await Movie.find();

  if (!allMovies) {
    throw new Error("No Movies Fouond");
  }
  return allMovies;
};

const addMovie = async (movieData) => {
  try {
    // Validate required fields
    const {
      title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      price,
      vote_average,
      vote_count,
    } = movieData;

    if (
      !title?.trim() ||
      !overview?.trim() ||
      !backdrop_path?.trim() ||
      !poster_path?.trim() ||
      !release_date?.trim() ||
      price === undefined
    ) {
      throw new Error("All required fields must be provided.");
    }

    // Check if movie already exists by title (case-insensitive)
    const existingMovie = await Movie.findOne({
      title: { $regex: new RegExp("^" + title + "$", "i") },
    });
    if (existingMovie) {
      throw new Error("Movie with this title already exists.");
    }

    // Convert and validate numerical fields
    const moviePrice = parseFloat(price);
    const avgVote = vote_average !== undefined ? parseFloat(vote_average) : 0;
    const voteCount = vote_count !== undefined ? parseInt(vote_count) : 0;

    if (isNaN(moviePrice) || moviePrice <= 0) {
      throw new Error("Price must be a positive number.");
    }
    if (isNaN(avgVote) || avgVote < 0 || avgVote > 10) {
      throw new Error("Vote average must be between 0 and 10.");
    }
    if (isNaN(voteCount) || voteCount < 0) {
      throw new Error("Vote count cannot be negative.");
    }

    // Capitalize first letter of title and overview
    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    const formattedOverview =
      overview.charAt(0).toUpperCase() + overview.slice(1);

    // Create new movie instance
    const newMovie = new Movie({
      title: formattedTitle,
      overview: formattedOverview,
      backdrop_path,
      poster_path,
      release_date,
      price: moviePrice,
      vote_average: avgVote,
      vote_count: voteCount,
    });

    // Save to database
    const savedMovie = await newMovie.save();
    return savedMovie;
  } catch (error) {
    console.error("Error in addMovie service:", error.message);
    throw new Error(error.message || "Failed to add movie.");
  }
};

const delMovie = async (id) => {
  try {
    return await Movie.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting movie: " + error.message);
  }
};

export {
  slideMovies,
  recMovies,
  getMovie,
  allMovies,
  addMovie,
  delMovie,
};