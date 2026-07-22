import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../redux/apis/authApi";
import { showError } from "../../utils/global";
import { registerValidationSchema } from "../validations/authValidations";
import FieldError from "../../components/FieldError";
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
      profileImage: null,
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fullname", values.fullname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("gender", values.gender);
        formData.append("phone", values.phone);
        if (values.profileImage) {
          formData.append("profileImage", values.profileImage);
        }
        const response = await register(formData).unwrap();
        if (response?.status && response?.statusCode === 201) {
          toast.success("registered successfully");
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
          Register Here
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
            <FieldError
              error={formik.errors.fullname}
              touched={formik.touched.fullname}
            />
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
            <FieldError
              error={formik.errors.email}
              touched={formik.touched.email}
            />
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
            <FieldError
              error={formik.errors.phone}
              touched={formik.touched.phone}
            />
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
            <FieldError
              error={formik.errors.gender}
              touched={formik.touched.gender}
            />
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
            <FieldError
              error={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <div className="p-1">
            <label htmlFor="profileImage" className="mb-1 text-gray-600">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              className="w-full outline-blue-400 p-1 border rounded"
              onChange={(e) => {
                formik.setFieldValue("profileImage", e.currentTarget.files[0]);
              }}
            />
            {formik.values.profileImage && (
              <p className="text-sm text-gray-500 mt-1">
                {formik.values.profileImage.name}
              </p>
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
