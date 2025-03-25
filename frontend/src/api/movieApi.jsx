import { Try } from "@mui/icons-material";
import axiosInstance from "./axiosInstance";

export const slideMovies = async () => {
  try {
    const response = await axiosInstance.get("/movie/carousel");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const recList = async () => {
  try {
    const response = await axiosInstance.get("/movie/recMovies");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const movieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/selectedMovie/${movieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const allMovies = async () => {
  try {
    const response = await axiosInstance.get("/movie/allMovies");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addOrder = async ({
  userId,
  movieId,
  numTickets,
  ticketType,
  totalAmount,
  showtime,
}) => {
  try {
    const response = await axiosInstance.post(
      `/movie/selectedMovie/${movieId}`,
      {
        userId,
        movieId,
        numTickets,
        ticketType,
        totalAmount,
        showtime,
      }
    );
    console.log("Order created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post("/movie/addMovie", movieData);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
export const updateMovie = async(movieId,movieData)=>{
  try {
    const  response = await axiosInstance.patch(`/movie/selectedMovie/${movieId}`,movieData)
    console.log(movieData,movieId)
    return response.message
  } catch (error) {
    console.error("Error updating movie :",error)
    throw error

  }
}
export const delMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(
      `movie/selectedMovie/${movieId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const orders = async () => {
  try {
    const response = await axiosInstance.get("/movie/orders");
    console.log(response);
    return response.data.orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `movie/userOrders?userId=${userId}`
    );
    console.log(response);
    return response.data.orders;
  } catch (error) {
    throw error;
  }
};

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("movie/allMovies");
    return response.data;
  } catch (error) {
    throw error;
  }
};
