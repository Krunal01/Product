import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/apis/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout, setLoginDetails } from "../../redux/slices/authSlice";
import { showError } from "../../utils/global";
import { changePasswordValidationSchema } from "../validations/authValidations";
const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changePassword] = useChangePasswordMutation();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await changePassword(values).unwrap();
        if (response?.status && response?.statusCode === 200) {
          toast.success(response?.message);
          dispatch(logout());
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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
          Change Your Password Here
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            <label htmlFor="currentPassword" className="mb-1 text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              placeholder="enter your current password"
              name="currentPassword"
              id="currentPassword"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <span className="text-red-400">
                  {formik.errors.currentPassword}
                </span>
              )}
          </div>
          <div className="p-1">
            <label htmlFor="newPassword" className="mb-1 text-gray-600">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="enter your new password"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <span className="text-red-400">{formik.errors.newPassword}</span>
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

export default ChangePassword;
