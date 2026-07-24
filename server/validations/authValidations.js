const { body } = require("express-validator");
const {
  fullnameValidation,
  emailValidation,
  phoneValidation,
  genderValidation,
  passwordFieldValidation,
  optValidation,
} = require("./common.validation");
const { errorResponse } = require("../utils/response");

const registerValidations = [
  fullnameValidation,
  emailValidation,
  phoneValidation,
  genderValidation,
  passwordFieldValidation("password", "password"),
];
const loginValidations = [
  emailValidation,
  passwordFieldValidation("password", "password"),
];

const changePasswordValidations = [
  passwordFieldValidation("currentPassword", "Current Password"),
  passwordFieldValidation("newPassword", "New Password"),
];
const forgotPasswordValidations = [emailValidation];
const verifyOtpValidations = [emailValidation, optValidation];
const resetPasswordValidations = [
  emailValidation,
  passwordFieldValidation("password", "password"),
];

const validateProfileImage = (req, res, next) => {
  if (!req.file) {
    return errorResponse(res, 400, "Profile image is required");
  }

  next();
};

module.exports = {
  validateProfileImage,
  registerValidations,
  loginValidations,
  changePasswordValidations,
  forgotPasswordValidations,
  verifyOtpValidations,
  resetPasswordValidations,
};
