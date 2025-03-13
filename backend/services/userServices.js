const User = require("../models/User");
const messages = require("../utils/responseMsg");
const mongoose = require("mongoose");

const currentUser = async ({ _id }) => {
  console.log("Received _id in currentUser:", _id); // ✅ Log 1

  if (!_id) {
    console.log("Invalid data: Missing _id"); // ✅ Log 2
    throw { status: 401, message: messages.INVALID_DATA };
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("Invalid ObjectId format:", _id); // ✅ Log 3
    throw { status: 400, message: messages.INVALID_ID };
  }

  try {
    const user = await User.findOne({ _id });
    console.log("User fetched from DB:", user); // ✅ Log 4

    if (!user) {
      console.log("User not found for _id:", _id); // ✅ Log 5
      throw { status: 404, message: messages.USER_NOT_FOUND };
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error("Error fetching user:", error); // ✅ Log 6
    throw { status: 500, message: messages.SERVER_ERROR };
  }
};

const usersList = async ({ _id }) => {
  try {
    const users = await User.find({ _id: { $ne: _id } }).select(
      "_id name email role"
    );
    console.log("Fetched users (excluding current user):", users);

    return users;
  } catch (error) {
    console.error("Error fetching users list:", error);
    throw { status: 500, message: messages.SERVER_ERROR };
  }
};
const deleteUser = async (id) => {
  console.log("User ID to delete:", id);

  const user = await User.findByIdAndDelete(id);
  console.log("Deleted User Data:", user);

  if (!user) {
    return "User not found";
  }

  return "User deleted successfully";
};

const isEmailTaken = async (email, userId) => {
  const existingUser = await User.findOne({ email, _id: { $ne: userId } });
  return !!existingUser;
};
const editUser = async (id, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

module.exports = { currentUser, usersList, deleteUser, editUser, isEmailTaken };
