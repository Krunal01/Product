import * as yup from "yup";

export const emailYupValidation = yup
  .string()
  .required("email is required")
  .email("email is invalid");

export const fullnameYupValidation = yup
  .string()
  .required("fullname is required");

export const phoneYupValidation = yup
  .string()
  .required("phone is required")
  .matches(/^[0-9]+$/, "only numbers are allowed")
  .length(10, "Phone number must be exactly 10 digits");

export const genderYupValidation = yup.string().required("gender is required");

export const otpYupValidation = yup
  .string()
  .required("otp is required")
  .matches(/^\d{6}$/, "OTP must be exactly 6 digits");

const PASSWORD_MIN_LENGTH = 6;

export const passwordYupValidation = yup
  .string()
  .required("Password is required")
  .min(
    PASSWORD_MIN_LENGTH,
    `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  );
