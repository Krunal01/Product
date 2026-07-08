import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../redux/apis/authApi";
const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      fullname: yup.string().required("fullname is required"),
      email: yup
        .string()
        .required("email is required")
        .email("email is invalid"),
      password: yup
        .string()
        .required("password is required")
        .min(8, "passwords character minimum length should be 6 "),
      gender: yup.string().required("gender is required"),
      phone: yup
        .string()
        .required("phone is required")
        .matches(/^[0-9]+$/, "only numbers are allowed")
        .min(10, "phone number must be 10 digits only")
        .max(10, "phone number must be 10 digits only"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await register(values).unwrap();
        console.log(response);
        // navigate("/login");
        toast.success("registered successfully");
      } catch (error) {
        toast.error(
          error?.error ||
            error?.message ||
            error?.response?.message ||
            "some error occured",
        );
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
            <label htmlFor="fullname" className="mb-1 text-gray-600">
              Fullname
            </label>
            <input
              type="text"
              placeholder="enter your fullname"
              name="fullname"
              id="fullname"
              className="w-full outline-blue-400 p-1 border  rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <span className="text-red-400">{formik.errors.fullname}</span>
            )}
          </div>
          <div className="p-1">
            <label htmlFor="email" className="mb-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              id="email"
              className="w-full outline-blue-400 p-1 border  rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-400">{formik.errors.email}</span>
            )}
          </div>
          <div className="p-1">
            <label htmlFor="phone" className="mb-1 text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="enter your phone number"
              name="phone"
              id="phone"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-400">{formik.errors.phone}</span>
            )}
          </div>
          <div className="p-1">
            <label htmlFor="gender" className="m-1 text-gray-600">
              Gender
            </label>
            <input
              type="radio"
              name="gender"
              id="male"
              className=" outline-blue-400 p-1 border m-1 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={"male"}
              checked={formik.values.gender === "male"}
            />
            <label htmlFor="male" className=" text-gray-600 m-1 ms-0">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              className=" outline-blue-400 p-1 border m-1 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={"female"}
              checked={formik.values.gender === "female"}
            />
            <label htmlFor="female" className=" text-gray-600 m-1 ms-0">
              Female
            </label>
            {formik.touched.gender && formik.errors.gender && (
              <span className="text-red-400">{formik.errors.gender}</span>
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
              Register
            </button>
          </div>
          <div>
            <p
              onClick={() => navigate("/login")}
              className="text-blue-400 text-right hover:underline cursor-pointer"
            >
              already a user? Login Here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
