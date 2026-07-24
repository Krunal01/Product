import * as yup from "yup";
import {
  fullnameYupValidation,
  genderYupValidation,
  phoneYupValidation,
} from "./common.validation.schema";

export const profileUpdateValidationSchema = yup.object().shape({
  fullname: fullnameYupValidation,
  gender: genderYupValidation,
  phone: phoneYupValidation,
});
