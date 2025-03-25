import express from "express";
import {
  getMovieControl,
  slideMovies,
  topRec,
  getAllMovies,
  addMovieControl,
  deleteMovie,
  updateMovieControl,
} from "../controllers/movieController.js";
import {
  orderConfirm,
  ordersControl,
  userOrderControl,
} from "../controllers/orderController.js";
import { API } from "../utils/allApis.js";
const router = express.Router();

// router.get("/movies/search", searchMovies);
router.get(API.MOVIE_CARAUSEL, slideMovies);
router.get(API.MOVIE_REC_MOVIES, topRec);
router.get(API.MOVIE_SELECTED, getMovieControl);
router.get(API.MOVIE_ALL, getAllMovies);
router.get(API.ORDERS, ordersControl);
router.get(API.USERS_ORDERS, userOrderControl);

router.post(API.MOVIE_ADD, addMovieControl);
router.post(API.MOVIE_SELECTED, orderConfirm);

router.delete(API.MOVIE_SELECTED, deleteMovie);

router.patch(API.MOVIE_SELECTED,updateMovieControl)

export default router;
