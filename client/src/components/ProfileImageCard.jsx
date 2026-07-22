import React from "react";
import { useFormik } from "formik";
import { useMyProfileQuery } from "../redux/apis/profileApi";

const ProfileImageCard = ({ user }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      profileImage: null,
    },
    onSubmit: (values) => {
      console.log(values);

      // call update image api
    },
  });

  return (
    <div className="border rounded-lg shadow px-4 py-2">
      <div className="text-xl font-semibold mb-2">Profile Image</div>

      <div className="flex justify-center">
        <img
          src={user?.profileImageUrl}
          alt=""
          className="w-32 h-32 rounded-full object-cover border"
        />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-2 flex justify-between items-end"
      >
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="profileImage"
            hidden
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("profileImage", e.currentTarget.files[0])
            }
          />

          <label
            htmlFor="profileImage"
            className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded h-max"
          >
            Change Profile Image
          </label>

          {formik.values.profileImage && (
            <p className="mt-2 text-sm">{formik.values.profileImage.name}</p>
          )}
        </div>

        <div className="flex gap-3 ">
          {formik.values.profileImage && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Upload
            </button>
          )}

          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileImageCard;
