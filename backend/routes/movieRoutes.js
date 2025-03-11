const express = require("express");
const { searchMovies, slideMovies,topRec } = require("../controllers/movieController");
const router = express.Router();

// router.get("/movies/search", searchMovies),
  router.get("/carousel", slideMovies);
  router.get("/recMovies",topRec)

module.exports = router;
