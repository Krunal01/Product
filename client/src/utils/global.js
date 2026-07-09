import toast from "react-hot-toast";

export const showError = (error = "some error occured") => {
  console.log(error);
  if (typeof error === "string") {
    return toast.error(error);
  } else {
    const msg =
      error?.data?.message ||
      error?.error ||
      error?.message ||
      error?.response?.message ||
      error.response?.data?.message ||
      "Something went wrong";
    return toast.error(msg);
  }
};
