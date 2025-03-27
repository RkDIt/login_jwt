
import axiosInstance from "./axiosInstance";
import { API } from "../utils/Api";

export const slideMovies = async () => {
  try {
    const response = await axiosInstance.get(API.CAROUSEL);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const recList = async () => {
  try {
    const response = await axiosInstance.get(API.REC_MOVIES);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const movieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`${API.SELECTED_MOVIE}/${movieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const allMovies = async () => {
  try {
    const response = await axiosInstance.get(API.ALL_MOVIES);
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
      `${API.SELECTED_MOVIE}/${movieId}`,
      {
        userId,
        movieId,
        numTickets,
        ticketType,
        totalAmount,
        showtime,
      }
    );
    // console.log("Order created successfully:", response.data);
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
    const response = await axiosInstance.post(API.ADD_MOVIE, movieData);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
export const updateMovie = async(movieId,movieData)=>{
  try {
    const  response = await axiosInstance.patch(`${API.SELECTED_MOVIE}/${movieId}`,movieData)
    // console.log(movieData,movieId)
    return response.message
  } catch (error) {
    console.error("Error updating movie :",error)
    throw error

  }
}
export const delMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(
      `${API.SELECTED_MOVIE}/${movieId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const orders = async () => {
  try {
    const response = await axiosInstance.get(API.ORDERS);
 
    return response.data.data;
  } catch (error) {

    throw error;
  }
};

export const userOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${API.USER_ORDERS}?userId=${userId}`
    );
    // console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get(API.ALL_MOVIES);
    return response.data;
  } catch (error) {
    throw error;
  }
};
