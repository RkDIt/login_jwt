import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import moment from "moment";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12);

const OrderSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  userId: { type: String, ref: "User", required: true },
  movieId: { type: String, ref: "Movie", required: true },
  numTickets: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  ticketType: {
    type: String,
    enum: ["m-ticket", "box-office"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
  },
  createdAt: { type: Number, default: () => moment().valueOf() },
  showtime: { type: Object, required: true },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
