import Order from "../models/Order.js";
import Movie from "../models/Movie.js";

export const addOrder = async ({
  userId,
  movieId,
  totalAmount,
  numTickets,
  ticketType,
  paymentStatus,
  showtime,
}) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }

    const newOrder = new Order({
      userId,
      movieId,
      totalAmount,
      numTickets,
      ticketType,
      paymentStatus,
      showtime,
      orderDate: new Date(),
    });

    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const allOrders = async () => {
  const orders = await Order.find().populate("userId movieId");
  // console.log(orders);
  return orders;
};

export const userOrders = async (userId) => {
  try {
    const orders = await Order.find({ userId }).populate("movieId");
    if (!orders.length) {
      throw new Error("No orders found for this user");
    }
    return orders;
  } catch (error) {
    throw new Error("Error fetching user orders: " + error.message);
  }
};
