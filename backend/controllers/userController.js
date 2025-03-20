import Response from "../utils/apiResponse.js";
import { currentUser, usersLists, deleteUser, editUser, isEmailTaken } from "../services/userServices.js";
import messages from "../utils/responseMsg.js";

export const getUser = async (req, res) => {
  console.log("req.params.id", req.params.id);

  try {
    const userId = req.params.id || req.user?.id;
    if (!userId) {
      return Response.error(res, {
        status: 400,
        message: messages.INVALID_DATA,
      });
    }

    const users = await currentUser({ _id: userId });

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

export const getAllUsers = async (req, res) => {
  const adminId = req.user.id;
  try {
    const user = await currentUser({ _id: adminId });
    console.log("Admin user", user);

    const usersList = await usersLists({ _id: adminId });
    if (!user) {
      return Response.error(res, { status: 404, message: messages.NOT_FOUND });
    }

    return Response.success(res, { status: 200, data: usersList });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserControl = async (req, res) => {
  const { id } = req.params;

  try {
    const delUser = await deleteUser(id);
    console.log("Deleted User:", delUser);

    return res.status(200).json({ success: true, message: delUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const editUserControl = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  console.log("Updating User:", { id, name, email, role });

  try {
    // Check if email already exists
    const emailExists = await isEmailTaken(email, id);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Update user
    const updatedUser = await editUser(id, { name, email, role });

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
