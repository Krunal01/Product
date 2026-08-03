import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import MyProfile from "./pages/MyProfile";
import AddProduct from "./pages/products/AddProduct";
import ProductDetail from "./pages/products/ProductDetail";
import AdminRoute from "./components/AdminRoute";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import CartValidateRoute from "./components/CartValidateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route element={<AdminRoute />}>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-product/:id" element={<AddProduct />} />
            </Route>
            <Route element={<CartValidateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
