const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const moment = require("moment");

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 12);

const OrderSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  userId: { type: String, ref: "User", required: true },
  movieId: { type: String, ref: "Movie", required: true },
  numTickets: { type: Number, require: true },
  totalAmount: { type: Number, require: true },
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
  showtime:{type:Object, require:true}
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
