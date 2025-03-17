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
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { verifyToken,authorizeRole };
