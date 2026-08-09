const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(404, "Token is required");
  }
  const token = authHeader.split(" ")[1];
  const tokenObj = jwt.verify(token, process.env.JWT_KEY);
  const user = await User.findById(tokenObj?.id);
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }
  req.user = user;
  next();
};
const adminMiddleware = async (req, res, next) => {
  if (!req.user) {
    throw new AppError(401, "Unauthorized");
  }
  if (req.user.role !== "admin") {
    throw new AppError(403, "Access denied, Admins only.");
  }
  next();
};
module.exports = { authMiddleware, adminMiddleware };
