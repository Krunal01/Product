import React from "react";
import { useFormik } from "formik";
import {
  useDeleteProfileImageMutation,
  useSaveProfileImageMutation,
} from "../redux/apis/profileApi";
import toast from "react-hot-toast";
import { showError } from "../utils/global";
import viteImg from "../assets/vite.svg";

const ProfileImageCard = ({ user }) => {
  const [saveProfileImage, { isLoading }] = useSaveProfileImageMutation();
  const [deleteImage, { isLoading: isDeleteLoading }] =
    useDeleteProfileImageMutation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      profileImage: user?.profileImageUrl || null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("profileImage", values.profileImage);
      try {
        const response = await saveProfileImage(formData).unwrap();
        if (response?.status && response?.statusCode === 200) {
          toast.success(response?.message);
          formik.resetForm();
        }
      } catch (error) {
        showError(error);
      }
    },
  });
  const handleDeleteProfileImage = async () => {
    try {
      const response = await deleteImage().unwrap();
      if (response?.status && response?.statusCode === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="border rounded-lg shadow px-4 py-2">
      <div className="text-xl font-semibold mb-2">Profile Image</div>

      <div className="flex justify-center">
        <img
          src={user?.profileImageUrl || viteImg}
          alt="#profileImage"
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
            {user?.profileImageUrl
              ? "Change Profile Image"
              : "Upload Profile Image"}
          </label>

          {formik.values.profileImage && (
            <p className="mt-2 text-sm">{formik.values.profileImage.name}</p>
          )}
        </div>

        <div className="flex gap-3 ">
          {formik.values.profileImage && (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          )}
          {user?.profileImageUrl && (
            <button
              type="button"
              disabled={isDeleteLoading}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleDeleteProfileImage}
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileImageCard;
