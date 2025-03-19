const express = require("express");
const {
  getMovieControl,
  slideMovies,
  topRec,
  getAllMovies,
  addMovieControl,
} = require("../controllers/movieController");
const {
  orderConfirm,
  ordersControl,
  userOrderControl,
} = require("../controllers/orderController");
const router = express.Router();

// router.get("/movies/search", searchMovies),
router.get("/carousel", slideMovies);
router.get("/recMovies", topRec);
router.get("/selectedMovie/:id", getMovieControl);
router.get("/allMovies", getAllMovies);
router.get("/orders", ordersControl);
router.get("/userOrders", userOrderControl);

router.post("/addMovie", addMovieControl);
router.post("/selectedMovie/:id", orderConfirm);

module.exports = router;
