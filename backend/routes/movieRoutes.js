const express = require("express");
const { getMovieControl, slideMovies,topRec } = require("../controllers/movieController");
const router = express.Router();

// router.get("/movies/search", searchMovies),
  router.get("/carousel", slideMovies);
  router.get("/recMovies",topRec)
  router.get("/selectedMovie/:id",getMovieControl)

module.exports = router;
