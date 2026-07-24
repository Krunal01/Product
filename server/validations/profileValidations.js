const { body } = require("express-validator");
const {
  fullnameValidation,
  genderValidation,
  phoneValidation,
} = require("./common.validation");

const profileUpdateValidation = [
  fullnameValidation,
  genderValidation,
  phoneValidation,
];
const changeEmailValidation = [
  body("currentEmail")
    .notEmpty()
    .withMessage("Current email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid current email")
    .normalizeEmail(),
  body("newEmail")
    .notEmpty()
    .withMessage("New email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
];

module.exports = { profileUpdateValidation, changeEmailValidation };
