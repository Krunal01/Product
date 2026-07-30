import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
