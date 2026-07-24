import * as yup from "yup";
import {
  emailYupValidation,
  fullnameYupValidation,
  genderYupValidation,
  phoneYupValidation,
} from "./common.validation.schema";

export const profileUpdateValidationSchema = yup.object().shape({
  fullname: fullnameYupValidation,
  gender: genderYupValidation,
  phone: phoneYupValidation,
});
export const changeEmailValidationSchema = yup.object().shape({
  currentEmail: emailYupValidation,
  newEmail: emailYupValidation.test(
    "different email",
    "New email must be different from the current email",
    function (value) {
      return value !== this.parent.currentEmail;
    },
  ),
});
