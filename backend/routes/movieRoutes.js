const express = require("express");
const { getMovieControl, slideMovies,topRec } = require("../controllers/movieController");
const {orderConfirm} = require("../controllers/orderController")
const router = express.Router();

// router.get("/movies/search", searchMovies),
  router.get("/carousel", slideMovies);
  router.get("/recMovies",topRec)
  router.get("/selectedMovie/:id",getMovieControl)
  router.post("/selectedMovie/:id",orderConfirm)

module.exports = router;
