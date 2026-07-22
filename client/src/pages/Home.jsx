import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/global";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      Home &nbsp;&nbsp;
      <button
        className="cursor-pointer"
        onClick={() => navigate("/change-password")}
      >
        Change Password
      </button>
      &nbsp;&nbsp;
      <button
        className="cursor-pointer"
        onClick={() => navigate("/my-profile")}
      >
        My Profile
      </button>
      &nbsp;&nbsp;
      <button className="cursor-pointer" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};

export default Home;
