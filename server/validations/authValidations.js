const { body, validationResult } = require("express-validator");

const registerValidation = [
  body("fullname").trim().notEmpty().withMessage("fullname is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail(),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone is required")
    .bail()
    .matches("/^[0-9]{10}$/")
    .withMessage("phone must be exactly 10 digits"),
  body("gender")
    .notEmpty()
    .withMessage("gender is required")
    .bail()
    .isIn(["male", "female"])
    .withMessage("gender must be male or female"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters"),
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

module.exports = {
  validate,
  registerValidation,
};
