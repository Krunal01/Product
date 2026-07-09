import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useVerifyOTPMutation } from "../../redux/apis/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showError } from "../../utils/global";
const VerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyOTP] = useVerifyOTPMutation();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: yup.object().shape({
      otp: yup.string().required("email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const email = JSON.parse(localStorage.getItem("email"));
        const obj = { ...values, email: email.email };
        const response = await verifyOTP(obj).unwrap();
        if (response?.status && response?.statusCode === 200) {
          toast.success(response?.message);
          navigate("/reset-password");
        }
      } catch (error) {
        showError(error);
      }
    },
  });

  return (
    <div className="flex justify-center">
      <div className="max-w-115 w-full mt-25 border rounded p-1 border-blue-400">
        <div className="text-2xl my-2 text-center text-blue-400">Enter OTP</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            <input
              type="number"
              placeholder="enter otp"
              name="otp"
              id="otp"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
            {formik.touched.otp && formik.errors.otp && (
              <span className="text-red-400">{formik.errors.otp}</span>
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

export default VerifyOTP;
