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

const authRouter = express.Router();

authRouter.post("/login", validateRequest(loginValidations), login);
authRouter.post("/register", validateRequest(registerValidations), register);
authRouter.post(
  "/forgot-password",
  validateRequest(forgotPasswordValidations),
  forgotPassword,
);
authRouter.post(
  "/verify-otp",
  validateRequest(verifyOtpValidations),
  verifyOTP,
);
authRouter.post(
  "/reset-password",
  validateRequest(resetPasswordValidations),
  resetPassword,
);

authRouter.post(
  "/change-password",
  authMiddleware,
  validateRequest(changePasswordValidations),
  changePassword,
);

module.exports = authRouter;
