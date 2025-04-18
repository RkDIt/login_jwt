import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8); // Uppercase & numbers, 8 chars

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => nanoid() }, // Custom Nano ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["user", "admin", "subadmin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
