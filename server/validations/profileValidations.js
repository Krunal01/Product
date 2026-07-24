const {
  fullnameValidation,
  genderValidation,
  phoneValidation,
} = require("./common.validation");

const profileUpdate = [fullnameValidation, genderValidation, phoneValidation];

module.exports = profileUpdate;
