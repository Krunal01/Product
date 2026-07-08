import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apis/authApi";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email is required")
        .email("email is invalid"),
      password: yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await login(values).unwrap();
        console.log(response);
        // localStorage.setItem("token", JSON.stringify(action.payload.token));
        // localStorage.setItem("user", JSON.stringify(action.payload.data));
      } catch (error) {
        toast.error(
          error?.error ||
            error?.message ||
            error?.response?.message ||
            "some error occured",
        );
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  });

  return (
    <div className="flex justify-center">
      <div className="max-w-115 w-full mt-25 border rounded p-1 border-blue-400">
        <div className="text-2xl my-2 text-center text-blue-400">
          Login Here
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            <label htmlFor="email" className="mb-1 text-gray-600">
              Email
            </label>
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
          <div className="p-1">
            <label htmlFor="password" className="mb-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
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
              disabled={false}
            >
              Login
            </button>
          </div>
          <div>
            <p
              onClick={() => navigate("/register")}
              className="text-blue-400 text-right hover:underline cursor-pointer"
            >
              New to here? Register here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
