import React from "react";
import { useFormik } from "formik";
import { useMyProfileQuery } from "../redux/apis/profileApi";

const ChangeEmailCard = ({ user }) => {
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      currentEmail: user?.email || "",
      newEmail: "",
    },

    onSubmit: (values) => {
      console.log(values);

      // change email api
    },
  });

  return (
    <div className="border rounded-lg shadow px-4 py-2 w-full">
      <div className="text-xl font-semibold mb-2">Change Email</div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Current Email</label>

          <input
            disabled
            className="w-full border rounded p-2 bg-gray-100"
            value={formik.values.currentEmail}
          />
        </div>

        <div className="mb-4">
          <label>New Email</label>

          <input
            type="email"
            name="newEmail"
            className="w-full border rounded p-2"
            placeholder="enter your new email"
            value={formik.values.newEmail}
            onChange={formik.handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded cursor-pointer"
        >
          Change Email
        </button>
      </form>
    </div>
  );
};

export default ChangeEmailCard;
