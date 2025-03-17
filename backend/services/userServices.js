const User = require("../models/User");
const messages = require("../utils/responseMsg");

const currentUser = async ({ _id }) => {
  console.log("Received _id in currentUser:", _id); // ✅ Log 1

  if (!_id) {
    console.log("Invalid data: Missing _id"); // ✅ Log 2
    throw { status: 401, message: messages.INVALID_DATA };
  }

  try {
    const user = await User.findOne({ _id });
    console.log("User fetched from DB:", user); // ✅ Log 3

    if (!user) {
      console.log("User not found for _id:", _id); // ✅ Log 4
      throw { status: 404, message: messages.USER_NOT_FOUND };
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error("Error fetching user:", error); // ✅ Log 5
    throw { status: 500, message: messages.SERVER_ERROR };
  }
};

const usersList = async ({ _id }) => {
  try {
    const users = await User.find({ _id: { $ne: _id } }).select("_id name email role");
    console.log("Fetched users (excluding current user):", users);

    return users;
  } catch (error) {
    console.error("Error fetching users list:", error);
    throw { status: 500, message: messages.SERVER_ERROR };
  }
};

const deleteUser = async (id) => {
  console.log("User ID to delete:", id);

  try {
    const user = await User.findOneAndDelete({ _id: id });
    console.log("Deleted User Data:", user);

    if (!user) {
      return "User not found";
    }

    return "User deleted successfully";
  } catch (error) {
    console.error("Error deleting user:", error);
    throw { status: 500, message: messages.SERVER_ERROR };
  }
};

const isEmailTaken = async (email, userId) => {
  const existingUser = await User.findOne({ email, _id: { $ne: userId } });
  return !!existingUser;
};

const editUser = async (id, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw { status: 500, message: messages.SERVER_ERROR };
  }
};

module.exports = { currentUser, usersList, deleteUser, editUser, isEmailTaken };
