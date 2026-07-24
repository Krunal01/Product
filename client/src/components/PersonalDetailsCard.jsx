import React from "react";
import { useFormik } from "formik";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "../redux/apis/profileApi";
import { showError, successToast } from "../utils/global";
import { profileUpdateValidationSchema } from "../pages/validations/profileValidations";
import FieldError from "./FieldError";

const PersonalDetailsCard = ({ user }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { refetch } = useMyProfileQuery();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: user?.fullname || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
    },
    validationSchema: profileUpdateValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateProfile(values).unwrap();
        if (response?.status && response?.statusCode === 200) {
          successToast(response?.message);
          refetch();
        }
      } catch (error) {
        showError(error);
      }
    },
  });

  return (
    <div className="border rounded-lg shadow px-4 py-2 w-full">
      <div className="text-xl font-semibold mb-2">Personal Details</div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Fullname</label>

          <input
            type="text"
            name="fullname"
            className="w-full border rounded p-2"
            value={formik.values.fullname}
            onChange={formik.handleChange}
          />
          <FieldError error={formik.errors.fullname} />
        </div>

        <div className="mb-3">
          <label>Phone</label>

          <input
            type="text"
            name="phone"
            className="w-full border rounded p-2"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <FieldError error={formik.errors.phone} />
        </div>

        <div className="mb-2 flex gap-4 items-center">
          <label>Gender</label>

          <div className="flex gap-5 ">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
              />
              &nbsp; Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
              />
              &nbsp; Female
            </label>
          </div>
          <FieldError error={formik.errors.gender} />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-5 py-2 rounded cursor-pointer"
        >
          {isLoading ? "Updating..." : "Update Details"}
        </button>
      </form>
    </div>
  );
};

export default PersonalDetailsCard;
