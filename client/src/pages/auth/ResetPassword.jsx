import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../redux/apis/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/global";
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetPassword] = useResetPasswordMutation();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("password is required")
        .min(6, "passwords character minimum length should be 6 "),
    }),
    onSubmit: async (values) => {
      try {
        const email = JSON.parse(localStorage.getItem("email"));
        const obj = { ...values, email: email.email };
        const response = await resetPassword(obj).unwrap();
        if (response?.status && response?.statusCode === 200) {
          toast.success(response?.message);
          localStorage.removeItem("email");
          navigate("/login");
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
          Reset Your Password
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            <label htmlFor="password" className="mb-1 text-gray-600">
              Enter New Password
            </label>
            <input
              type="password"
              placeholder="enter new password"
              name="password"
              id="password"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-400">{formik.errors.password}</span>
            )}
          </div>
          <div className="w-full p-1 mt-2">
            <button
              type="submit"
              className="text-white w-full bg-blue-400 p-1 rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
