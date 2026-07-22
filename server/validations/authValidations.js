const { body, validationResult } = require("express-validator");
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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "validation failed",
      status: false,
      statusCode: 400,
      errors: errors.array(),
    });
  }
  next();
};

const validateProfileImage = (req, res, next) => {
  if (!req.file) {
    return errorResponse(res, 400, "Profile image is required");
  }

  next();
};

const validateRequest = (validations) => [...validations, validate];

module.exports = {
  validateProfileImage,
  validateRequest,
  registerValidations,
  loginValidations,
  changePasswordValidations,
  forgotPasswordValidations,
  verifyOtpValidations,
  resetPasswordValidations,
};
