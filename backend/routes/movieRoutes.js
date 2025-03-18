const express = require("express");
const {
  getMovieControl,
  slideMovies,
  topRec,
  getAllMovies,
  addMovieControl
} = require("../controllers/movieController");
const { orderConfirm } = require("../controllers/orderController");
const router = express.Router();

// router.get("/movies/search", searchMovies),
router.get("/carousel", slideMovies);
router.get("/recMovies", topRec);
router.get("/selectedMovie/:id", getMovieControl);
router.get("/allMovies", getAllMovies);
router.post("/selectedMovie/:id", orderConfirm);
router.post("/addMovie",addMovieControl)

module.exports = router;
