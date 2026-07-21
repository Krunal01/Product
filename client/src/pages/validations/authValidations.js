import * as yup from "yup";
import {
  emailYupValidation,
  fullnameYupValidation,
  genderYupValidation,
  otpYupValidation,
  passwordYupValidation,
  phoneYupValidation,
} from "./common.validation.schema";

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup.string().required("current password is required"),
  newPassword: yup
    .string()
    .required("new password is required")
    .test(
      "not-same",
      "new password should not be same as current password",
      function (value) {
        return value !== this.parent.currentPassword;
      },
    ),
});
export const forgotPasswordValidationSchema = yup.object().shape({
  email: emailYupValidation,
});
export const loginValidationSchema = yup.object().shape({
  email: emailYupValidation,
  password: yup.string().required("password is required"),
});
export const registerValidationSchema = yup.object().shape({
  fullname: fullnameYupValidation,
  email: emailYupValidation,
  password: passwordYupValidation,
  gender: genderYupValidation,
  phone: phoneYupValidation,
});
export const resetPasswordValidationSchema = yup.object().shape({
  password: passwordYupValidation,
});
export const verifyOTPValidationSchema = yup.object().shape({
  otp: otpYupValidation,
});
