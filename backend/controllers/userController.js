import Response from "../utils/apiResponse.js";
import { 
  currentUser, 
  usersLists, 
  deleteUser, 
  editUser, 
  isEmailTaken 
} from "../services/userServices.js";
import messages from "../utils/responseMsg.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id || req.user?.id;

    // Validate user ID
    if (!userId) {
      return Response.error(res, {
        status: 400,
        message: messages.INVALID_DATA,
      });
    }

    const users = await currentUser({ _id: userId });

    // Check if user exists
    if (!users) {
      return Response.error(res, { 
        status: 404, 
        message: messages.USER_NOT_FOUND 
      });
    }

    return Response.success(res, { 
      status: 200, 
      data: users,
      message: messages.FETCH_SUCCESS
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    // Handle specific error types
    if (error.status === 401) {
      return Response.error(res, {
        status: 401,
        message: messages.INVALID_TOKEN,
      });
    }

    return Response.error(res, { 
      status: error.status || 500, 
      message: error.message || messages.SERVER_ERROR 
    });
  }
};

export const getAllUsers = async (req, res) => {
  const adminId = req.user.id;

  try {
    // Verify admin exists
    const user = await currentUser({ _id: adminId });

    if (!user) {
      return Response.error(res, { 
        status: 404, 
        message: messages.USER_NOT_FOUND 
      });
    }

    // Fetch users list
    const usersList = await usersLists({ _id: adminId });

    if (!usersList || usersList.length === 0) {
      return Response.error(res, { 
        status: 404, 
        message: messages.NO_DATA_FOUND 
      });
    }

    return Response.success(res, { 
      status: 200, 
      data: usersList,
      message: messages.FETCH_SUCCESS
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    
    return Response.error(res, { 
      status: error.status || 500, 
      message: error.message || messages.SERVER_ERROR 
    });
  }
};

export const deleteUserControl = async (req, res) => {
  const { id } = req.params;

  try {
    const delUser = await deleteUser(id);

    if (!delUser) {
      return Response.error(res, { 
        status: 404, 
        message: messages.USER_NOT_FOUND 
      });
    }

    return Response.success(res, { 
      status: 200, 
      data: delUser,
      message: "User deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    
    return Response.error(res, { 
      status: error.status || 500, 
      message: error.message || messages.SERVER_ERROR 
    });
  }
};

export const editUserControl = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    // Validate input
    if (!name || !email) {
      return Response.error(res, {
        status: 400,
        message: messages.REQUIRED_FIELDS
      });
    }

    // Check if email already exists
    const emailExists = await isEmailTaken(email, id);
    if (emailExists) {
      return Response.error(res, {
        status: 400,
        message: messages.USER_EXISTS
      });
    }

    // Update user
    const updatedUser = await editUser(id, { name, email, role });

    if (!updatedUser) {
      return Response.error(res, { 
        status: 404, 
        message: messages.USER_NOT_FOUND 
      });
    }

    return Response.success(res, {
      status: 200,
      data: updatedUser,
      message: messages.USER_UPDATED
    });
  } catch (error) {
    console.error("Error updating user:", error);
    
    return Response.error(res, { 
      status: error.status || 500, 
      message: error.message || messages.SERVER_ERROR 
    });
  }
};