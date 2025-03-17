const Response = require("../utils/apiResponse");
const userServices = require("../services/userServices");
const messages = require("../utils/responseMsg");

const getUser = async (req, res) => {
  // console.log("req.user", req.user);
  console.log("req.params.id", req.params.id);

  try {
    const userId = req.params.id || req.user?.id;
    if (!userId) {
      return Response.error(res, {
        status: 400,
        message: messages.INVALID_DATA,
      });
    }

    const users = await userServices.currentUser({ _id: userId });

    if (!users) {
      return Response.error(res, { status: 404, message: messages.NOT_FOUND });
    }

    return Response.success(res, { status: 200, data: users });
  } catch (error) {
    if (error.status === 401) {
      return Response.error(res, {
        status: 401,
        message: messages.UNAUTHORIZED,
      });
    }
    if (error.status === 404) {
      return Response.error(res, { status: 404, message: messages.NOT_FOUND });
    }
    return Response.error(res, { status: 500, message: messages.SERVER_ERROR });
  }
};

const getAllUsers = async (req, res) => {
  const adminId = req.user.id;
  try {
    const user = await userServices.currentUser({ _id: adminId });
    console.log("Admin user", user);

    const usersList = await userServices.usersList({ _id: adminId });
    if (!user) {
      return Response.error(res, { status: 404, message: messages.NOT_FOUND });
    }

    return Response.success(res, { status: 200, data: usersList });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserControl = async (req, res) => {
  const { id } = req.params; // Use "id" to match the route parameter

  try {
    const delUser = await userServices.deleteUser(id); // Pass only the ID
    console.log("Deleted User:", delUser);

    return res.status(200).json({ success: true, message: delUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editUserControl = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  console.log("Updating User:", { id, name, email, role });

  try {
    // Check if email already exists
    const emailExists = await userServices.isEmailTaken(email, id);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Update user
    const updatedUser = await userServices.editUser(id, { name, email, role });

    return res.status(200).json({
      success: true,
      message: messages.USER_Updated,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: messages.SERVER_ERROR,
    });
  }
};

module.exports = { getUser, getAllUsers, deleteUserControl, editUserControl };
