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
const {
  registerValidations,
  loginValidations,
  changePasswordValidations,
  forgotPasswordValidations,
  verifyOtpValidations,
  resetPasswordValidations,
  validateRequest,
} = require("../validations/authValidations");
const { authLimiter, protectedLimiter } = require("../limiters/limiter");
const upload = require("../middlewares/upload.middleware");

const authRouter = express.Router();

authRouter.post(
  "/login",
  authLimiter,
  validateRequest(loginValidations),
  login,
);
authRouter.post(
  "/register",
  authLimiter,
  upload.single("profileImage"),
  validateRequest(registerValidations),
  register,
);
authRouter.post(
  "/forgot-password",
  authLimiter,
  validateRequest(forgotPasswordValidations),
  forgotPassword,
);
authRouter.post(
  "/verify-otp",
  authLimiter,
  validateRequest(verifyOtpValidations),
  verifyOTP,
);
authRouter.post(
  "/reset-password",
  authLimiter,
  validateRequest(resetPasswordValidations),
  resetPassword,
);

authRouter.post(
  "/change-password",
  authMiddleware,
  protectedLimiter,
  validateRequest(changePasswordValidations),
  changePassword,
);

module.exports = authRouter;
