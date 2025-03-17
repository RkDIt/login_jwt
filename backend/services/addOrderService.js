const Order = require("../models/Order");
const Movie = require("../models/Movie");

const addOrder = async ({ userId, movieId, totalAmount, numTickets, ticketType, paymentStatus }) => {
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
      orderDate: new Date(), 
    });

    const savedOrder = await newOrder.save();

    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addOrder };
