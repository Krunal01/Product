import React from "react";
import { useFormik } from "formik";
import {
  useChangeEmailMutation,
  useMyProfileQuery,
} from "../redux/apis/profileApi";
import { showError, successToast } from "../utils/global";
import { changeEmailValidationSchema } from "../pages/validations/profileValidations";
import FieldError from "./FieldError";

const ChangeEmailCard = ({ user }) => {
  const [changeEmail, { isLoading }] = useChangeEmailMutation();
  const { refetch } = useMyProfileQuery();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      currentEmail: user?.email || "",
      newEmail: "",
    },
    validationSchema: changeEmailValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await changeEmail(values).unwrap();
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
          <FieldError error={formik.errors.newEmail} />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-5 py-2 rounded cursor-pointer"
        >
          {isLoading ? "Email Updating..." : "Change Email"}
        </button>
      </form>
    </div>
  );
};

export default ChangeEmailCard;
