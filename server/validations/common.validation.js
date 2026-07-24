const { body, validationResult } = require("express-validator");

const fullnameValidation = body("fullname")
  .trim()
  .notEmpty()
  .withMessage("fullname is required");

const emailValidation = body("email")
  .notEmpty()
  .withMessage("email is required")
  .bail()
  .isEmail()
  .withMessage("invalid email")
  .normalizeEmail();

const passwordFieldValidation = (field, label) => {
  return body(field)
    .notEmpty()
    .withMessage(`${label} is required`)
    .bail()
    .isLength({ min: 6 })
    .withMessage(`${label} must be atleast 6 characters`);
};

const genderValidation = body("gender")
  .notEmpty()
  .withMessage("gender is required")
  .bail()
  .isIn(["male", "female"])
  .withMessage("gender must be male or female");

const phoneValidation = body("phone")
  .trim()
  .notEmpty()
  .withMessage("phone is required")
  .bail()
  .matches(/^\d{10}$/)
  .withMessage("Please enter a valid 10-digit Indian mobile number");
// .isMobilePhone("en-IN")
// .withMessage("invalid phone");

const optValidation = body("otp")
  .notEmpty()
  .withMessage("otp is required")
  .bail()
  .isNumeric()
  .withMessage("OTP must contain numbers only")
  .bail()
  .isLength({ min: 6, max: 6 })
  .withMessage("OTP must be exactly 6 digits long");

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

const validateRequest = (validations) => [...validations, validate];

module.exports = {
  fullnameValidation,
  emailValidation,
  genderValidation,
  phoneValidation,
  optValidation,
  passwordFieldValidation,
  validate,
  validateRequest,
};
