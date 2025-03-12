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
    console.log("hwllo", users);

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
  const adminId  =   req.user.id;
  try {
    const user = await userServices.currentUser({ _id: adminId });
    console.log("Admin user", user);

    const usersList =  await userServices.usersList({ _id: adminId });
    if (!user) {
      return Response.error(res, { status: 404, message: messages.NOT_FOUND });
    }

    return Response.success(res, { status: 200, data: usersList });
  } catch (error) {console.log(error)}
};

module.exports = { getUser, getAllUsers };
