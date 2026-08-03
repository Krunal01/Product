import React from "react";
import { useGetCartItemsQuery } from "../redux/apis/cartApi";
import { Navigate, Outlet } from "react-router-dom";

const CartValidateRoute = () => {
  const { data, isLoading } = useGetCartItemsQuery();
  if (isLoading) {
    return (
      <div>
        <h1>Please wait...</h1>
      </div>
    );
  }
  return <>{data?.data?.length === 0 ? <Navigate to={"/"} /> : <Outlet />}</>;
};

export default CartValidateRoute;
