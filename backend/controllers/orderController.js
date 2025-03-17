const Response = require("../utils/apiResponse");
const addOrderService = require("../services/addOrderService");
const messages = require("../utils/responseMsg");

const orderConfirm = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { userId, totalAmount, numTickets, ticketType, paymentStatus } =
      req.body;

    const orderDetails = await addOrderService.addOrder({
      userId,
      movieId,
      totalAmount,
      numTickets,
      ticketType,
      paymentStatus
    });
    return Response.success(res, { status: 200, data: orderDetails });
  } catch (error) {}
};

module.exports = { orderConfirm };
``