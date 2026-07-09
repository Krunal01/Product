const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, 401, "Token is required");
    }
    const token = authHeader.split(" ")[1];
    const tokenObj = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(tokenObj?.id);
    if (!user) {
      return errorResponse(res, 401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return errorResponse(res, 401, "Invalid token");
    }

    if (error.name === "TokenExpiredError") {
      return errorResponse(res, 401, "Token expired");
    }
    return errorResponse(res, 500, "Internal server error");
  }
};
module.exports = { authMiddleware };
