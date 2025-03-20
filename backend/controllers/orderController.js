import Response from "../utils/apiResponse.js";
import addOrderService from "../services/addOrderService.js";
import messages from "../utils/responseMsg.js";

export const orderConfirm = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { userId, totalAmount, numTickets, ticketType, paymentStatus, showtime } = req.body;

    const orderDetails = await addOrderService.addOrder({
      userId,
      movieId,
      totalAmount,
      numTickets,
      ticketType,
      paymentStatus,
      showtime,
    });

    return Response.success(res, { status: 200, data: orderDetails });
  } catch (error) {
    throw new Error(error);
  }
};

export const ordersControl = async (req, res) => {
  try {
    const orders = await addOrderService.allOrders();
    res.status(200).json({ message: "OK", orders });
  } catch (error) {
    throw new Error(error);
  }
};

export const userOrderControl = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("userId", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await addOrderService.userOrders(userId);

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
