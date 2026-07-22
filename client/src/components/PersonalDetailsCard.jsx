import React from "react";
import { useFormik } from "formik";
import { useMyProfileQuery } from "../redux/apis/profileApi";

const PersonalDetailsCard = ({ user }) => {
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      fullname: user?.fullname || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
    },

    onSubmit: (values) => {
      console.log(values);

      // update profile api
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
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded cursor-pointer"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default PersonalDetailsCard;
