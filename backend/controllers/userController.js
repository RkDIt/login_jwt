const User = require("../models/User");
const Response = require("../utils/apiResponse");

const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    return Response.success(res, { status: 200, data: users });
  } catch (error) {
    return Response.error(res, { status: 500, message: "Server error" });
  }
};

module.exports = { getUsers };
