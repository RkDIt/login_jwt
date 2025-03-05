const User = require("../models/User");
const Response = require("../utils/apiResponse");
const hashedPassword = require("../utils/passwordHasher");
const messages = require("../utils/responseMsg");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return Response.error(res, { status: 400, message: messages.REQUIRED_FIELDS });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return Response.error(res, { status: 400, message: messages.USER_EXISTS });
    }
    const hashPassword = await hashedPassword(password);


    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    if (user) {
      Response.success(res, {
        status: 201,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: user.generateToken(),
        },
      });
    } else {
      Response.error(res, {status:400, message: messages.INVALID_DATA });
    }
  } catch (error) {
    Response.error(res, {status:500, message: messages.SERVER_ERROR });
  }
};

// const loginUser = async (req, res) => {};

module.exports = { registerUser };
