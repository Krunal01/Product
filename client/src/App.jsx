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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
