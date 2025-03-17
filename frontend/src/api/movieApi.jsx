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

export const addOrder = async ({
  userId,
  movieId,
  numTickets,
  ticketType,
  totalAmount,
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
