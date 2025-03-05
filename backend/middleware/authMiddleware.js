const jwt = require("jsonwebtoken");
const Response = require("../utils/apiResponse");
const messages = require("../utils/responseMsg");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return Response.error(res, { status: 401, message: messages.NO_TOKEN });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded; // Attach user info (id, role) to request

    next(); // Move to next middleware or controller
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return Response.error(res, { status: 403, message: messages.INVALID_TOKEN });
  }
};

module.exports = { verifyToken };
