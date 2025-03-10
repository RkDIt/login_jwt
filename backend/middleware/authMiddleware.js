const jwt = require("jsonwebtoken");
const Response = require("../utils/apiResponse");
const messages = require("../utils/responseMsg");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.startsWith("Bearer ")
      ? req.header("Authorization").split(" ")[1]
      : null;

    if (!token || token.trim() === "") {
      return Response.error(res, { status: 401, message: messages.NO_TOKEN });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("id and role",decoded)
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("JWT Verification Error:", error);

    if (error.name === "TokenExpiredError") {
      return Response.error(res, { status: 401, message: messages.TOKEN_EXPIRED });
    } else if (error.name === "JsonWebTokenError") {
      return Response.error(res, { status: 403, message: messages.INVALID_TOKEN });
    } else {
      return Response.error(res, { status: 500, message: messages.SERVER_ERROR });
    }
  }
};

module.exports = { verifyToken };
