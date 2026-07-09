const express = require("express");
const {
  login,
  register,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/auth/authCtrl");
const { authMiddleware } = require("../middlewares/middleware");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);

authRouter.post("/change-password", authMiddleware, changePassword);

module.exports = authRouter;
