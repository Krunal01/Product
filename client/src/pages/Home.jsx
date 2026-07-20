import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/global";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home &nbsp;&nbsp;
      <button onClick={() => navigate("/change-password")}>
        Change Password
      </button>
      &nbsp;&nbsp;
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Home;
