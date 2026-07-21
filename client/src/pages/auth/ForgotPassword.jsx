import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apis/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/global";
import { forgotPasswordValidationSchema } from "../validations/authValidations";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword] = useForgotPasswordMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await forgotPassword(values).unwrap();
        if (response?.status && response?.statusCode === 200) {
          toast.success(response?.message);
          localStorage.setItem("email", JSON.stringify(values));
          navigate("/verify-otp");
        }
      } catch (error) {
        showError(error);
      }
    },
  });

  return (
    <div className="flex justify-center">
      <div className="max-w-115 w-full mt-25 border rounded p-1 border-blue-400">
        <div className="text-2xl my-2 text-center text-blue-400">
          Enter your email
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            {/* <label htmlFor="currentPassword" className="mb-1 text-gray-600">
              Current Password
            </label> */}
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              id="email"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-400">{formik.errors.email}</span>
            )}
          </div>
          <div className="w-full p-1 mt-2">
            <button
              type="submit"
              className="text-white w-full bg-blue-400 p-1 rounded cursor-pointer"
              disabled={false}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
