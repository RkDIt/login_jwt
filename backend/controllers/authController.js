const User = require("../models/User");
const Response = require("../utils/apiResponse");
const { hashedPassword, comparePassword } = require("../utils/passwordHasher");
const messages = require("../utils/responseMsg");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return Response.error(res, {
        status: 400,
        message: messages.REQUIRED_FIELDS,
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return Response.error(res, {
        status: 400,
        message: messages.USER_EXISTS,
      });
    }

    const hashPassword = await hashedPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    if (user) {
      return Response.success(res, {
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
      return Response.error(res, {
        status: 400,
        message: messages.INVALID_DATA,
      });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    return Response.error(res, { status: 500, message: messages.SERVER_ERROR });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return Response.error(res, {
        status: 401,
        message: messages.REQUIRED_FIELDS,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.error(res, {
        status: 402,
        message: messages.INVALID_CREDENTIALS,
      });
    }
    console.log(password);
    console.log(user.password);

    const isMatch = await comparePassword(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return Response.error(res, {
        status: 403,
        message: messages.PASS_NOMATCH,
      });
    }

    // Success response
    return Response.success(res, {
      status: 200,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.generateToken(),
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return Response.error(res, { status: 500, message: messages.SERVER_ERROR });
  }
};

module.exports = { registerUser, loginUser };
