import Response from "../utils/apiResponse.js";
import { addOrder, allOrders, userOrders } from "../services/addOrderService.js";
import messages from "../utils/responseMsg.js";

export const orderConfirm = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { 
      userId, 
      totalAmount, 
      numTickets, 
      ticketType, 
      paymentStatus, 
      showtime 
    } = req.body;

    // Input validation
    if (!userId || !movieId || !totalAmount || !numTickets) {
      return Response.error(res, {
        status: 400,
        message: messages.REQUIRED_FIELDS
      });
    }

    const orderDetails = await addOrder({
      userId,
      movieId,
      totalAmount,
      numTickets,
      ticketType,
      paymentStatus,
      showtime,
    });

    if (!orderDetails) {
      return Response.error(res, {
        status: 400,
        message: messages.ORDER_NOT_CREATED
      });
    }

    return Response.success(res, { 
      status: 200, 
      data: orderDetails,
      message: messages.ORDER_CREATED
    });
  } catch (error) {
    console.error("Error in orderConfirm:", error);
    
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const ordersControl = async (req, res) => {
  try {
    const orders = await allOrders();

    if (!orders || orders.length === 0) {
      return Response.error(res, {
        status: 404,
        message: messages.NO_DATA_FOUND
      });
    }

    return Response.success(res, { 
      status: 200, 
      data: orders,
      message: messages.FETCH_SUCCESS 
    });
  } catch (error) {
    console.error("Error in ordersControl:", error);
    
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};

export const userOrderControl = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Validate userId
    if (!userId) {
      return Response.error(res, {
        status: 400,
        message: messages.REQUIRED_FIELDS
      });
    }

    const orders = await userOrders(userId);

    // Check if orders exist
    if (!orders || orders.length === 0) {
      return Response.error(res, {
        status: 404,
        message: messages.NO_DATA_FOUND
      });
    }

    return Response.success(res, { 
      status: 200, 
      data: orders,
      message: messages.USER_ORDERS_RETRIEVED
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    
    return Response.error(res, {
      status: error.status || 500,
      message: error.message || messages.SERVER_ERROR,
    });
  }
};