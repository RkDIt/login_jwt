import express from "express";
import {
  getMovieControl,
  slideMovies,
  topRec,
  getAllMovies,
  addMovieControl,
  deleteMovie,
} from "../controllers/movieController.js";
import {
  orderConfirm,
  ordersControl,
  userOrderControl,
} from "../controllers/orderController.js";

const router = express.Router();

// router.get("/movies/search", searchMovies);
router.get("/carousel", slideMovies);
router.get("/recMovies", topRec);
router.get("/selectedMovie/:id", getMovieControl);
router.get("/allMovies", getAllMovies);
router.get("/orders", ordersControl);
router.get("/userOrders", userOrderControl);

router.post("/addMovie", addMovieControl);
router.post("/selectedMovie/:id", orderConfirm);

router.delete("/selectedMovie/:id", deleteMovie);

export default router;
