import toast from "react-hot-toast";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";

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
export const successToast = (msg = "success") => {
  if (typeof msg === "string") {
    return toast.success(msg);
  } else {
    return toast.success(msg?.message || "success");
  }
};

export const handleLogout = () => {
  store.dispatch(logout());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace("/login");
};
